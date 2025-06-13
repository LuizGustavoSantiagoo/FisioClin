<?php

use Illuminate\Support\Facades\Route;
use app\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);
