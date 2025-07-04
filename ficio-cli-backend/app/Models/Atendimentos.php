<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atendimentos extends Model
{
    use HasFactory;

    protected $fillable = [
        'motivo',
        'sintomas',
        'conclusao',
        'id_paciente',
        'id_fisio',
    ];

    public function users() {
        return $this->belongsTo(User::class, 'id_fisio', 'id');
    }
}
