<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    public function index(Request $request)
    {
        $query = Paciente::query();

        if ($request->has('name') && !empty($request->input('name'))) {
            $name = $request->input('name');
            $query->where('name', 'like', '%' . $name . '%');
        }

        if ($request->has('cpf') && !empty($request->input('cpf'))) {
            $cpf = $request->input('cpf');

            $query->where('cpf', 'like', '%' . $cpf . '%');
        }

        $pacientes = $query->get();

        return response()->json($pacientes);
    }

    public function store(Request $request)
    {
        try {

            $validateData = $request->validate([
                'name' => ['required', 'string', 'max: 255'],
                'cpf' => ['required', 'string', 'unique:pacientes,cpf', 'regex:/^\d{11}$/'],
                'data_nasc' => ['required', 'date', 'before: today'],
                'contato' => ['required', 'string', 'max: 12'],
            ]);

            $paciente = Paciente::create($validateData);

            return response()->json([
                'message' => 'Paciente cadastrado com succeso!',
                'paciente' => $paciente,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            // Retorna outros erros inesperados
            return response()->json([
                'message' => 'Ocorreu um erro inesperado ao cadastrar paciente.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $paciente = Paciente::find($id);
        return $paciente;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $paciente = Paciente::find($id)->where('id', $id)->first();

        if ($paciente) {
            $paciente->name = $request->input('name');
            $paciente->cpf = $request->input('cpf');
            $paciente->data_nasc = $request->input('data_nasc');
            $paciente->contato = $request->input('contato');

            $paciente->save();

            return response()->json(['message' => 'Paciente atualizado com sucesso!'], 200);
        }

        return response()->json(['message' => 'Paciente não encontrado.'], 404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
