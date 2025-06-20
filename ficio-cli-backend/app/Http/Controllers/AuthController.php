<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request['email'];
        $senha = $request['senha'];

        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($senha, $user->password)) {
            return response()->json(['erro' => 'Credenciais inválidas'], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'user' => $user]);
    }
}
