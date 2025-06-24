<?php

use App\Http\Controllers\AtendimentosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\http\Controllers\PacienteController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);

Route::resource('pacientes', PacienteController::class);

Route::resource('atendimentos', AtendimentosController::class);
