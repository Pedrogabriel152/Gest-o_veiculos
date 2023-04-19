<?php

namespace App\Http\Repositories;

use App\Models\Empresa;
use App\Models\Veiculo;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class VeiculoRepository{
    public static function register(Request $data){
        return DB::transaction(function() use ($data) {
            $empresa = Empresa::whereEmail($data->header(('email')))->first();
            $newVeiculo = Veiculo::create([
                'modelo' => $data->modelo,
                'marca' => $data->marca,
                'placa' => $data->placa,
                'cor' => $data->cor,
                'ano' => $data->ano,
                'tipo' => $data->tipo,
                'id_empresa' => $empresa->id
            ]);

            return $newVeiculo;
        });
    }
}