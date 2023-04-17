<?php

namespace App\Http\Repositories;

use App\Models\Empresa;
use Illuminate\Support\Facades\DB;

class EmpresaRepository {
    public static function register(array $empresa){
        return DB::transaction(function() use ($empresa) {
            $empresa = Empresa::create([
                'name' => $empresa['name'],
                'email' => $empresa['email'],
                'password' => $empresa['password']
            ]);

            $empresa->password = '';

            return $empresa;
        });
    }
}