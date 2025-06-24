<?php

namespace App\Http\Controllers;

use App\Models\Atendimentos;
use Illuminate\Validation\ValidationException;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;

class AtendimentosController extends Controller
{
    public function index(Request $request) {}

    public function store(Request $request)
    {

        try {

            $validateData = $request->validate([
                'motivo' => ['required', 'string', 'max:255'],
                'sintomas' => ['required', 'string', 'max:255'],
                'conclusao' => ['string', 'max:255'],
                'id_fisio' => ['required', 'integer', 'exists:users,id'],
                'id_paciente' => ['required', 'integer', 'exists:pacientes,id'],
            ]);

            $atendimento = Atendimentos::create($validateData);

            return response()->json([
                'message' => 'Atendimento realizado com sucesso!',
                'Atendimento' => $atendimento
            ], 201);
        } catch (ValidationException $e) {

            return response()->json([
                'message' => 'Erro de validação.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Ocorreu um erro inesperado ao cadastrar o atendimento.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

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
