<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin do Sistema',
            'email' => 'admin@example.com',
            'password' => Hash::make('senha'), // Use uma senha segura aqui
            'role' => 'ADMIN', // Definindo explicitamente a role como ADMIN
            'email_verified_at' => now(), // Opcional: marca como verificado
        ]);

        // 2. Criar um usuário FISIOTERAPEUTA (exemplo)
        User::create([
            'name' => 'Dr. João Silva',
            'email' => 'joao.silva@example.com',
            'password' => Hash::make('senha'),
            'role' => 'FISIOTERAPEUTA', // Definindo explicitamente a role como FISIOTERAPEUTA
            'email_verified_at' => now(),
        ]);
    }
}
