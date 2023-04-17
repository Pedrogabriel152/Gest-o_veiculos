<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veiculo extends Model
{
    use HasFactory;

    protected $fillable = [
        'modelo',
        'marca',
        'placa',
        'cor',
        'ano',
        'id_empresa'
    ];

    public function empresa() {
        return $this->hasOne(Empresa::class);
    }
}
