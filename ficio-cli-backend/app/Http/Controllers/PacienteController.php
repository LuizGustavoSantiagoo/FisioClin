<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class PacienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pacientes = Paciente::all();
        return response()->json($pacientes);
    }

    /**
     * Store a newly created resource in storage.
     */
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
