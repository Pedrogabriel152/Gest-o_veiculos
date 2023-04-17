<?php

namespace App\Models;

use App\Models\Veiculo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Empresa extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password'
    ];

    protected $hidden = [
        'password'
    ];

    public function veiculos() {
        return $this->hasMany(Veiculo::class);
    }
}
