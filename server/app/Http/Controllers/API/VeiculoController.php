<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Repositories\VeiculoRepository;
use App\Models\Veiculo;

session_start();

class VeiculoController extends Controller
{
    public function create(Request $request) {
        $newVeiculo = VeiculoRepository::register($request);

        if(!$newVeiculo) {
            return response()->json(['message' => 'Falha ao registrar um novo veiculo, tente novamente mais tarde'], 500);
        }

        return response()->json($newVeiculo, 500);
    }

    public function edit(int $id){
        $veiculo = Veiculo::whereId($id)->first();

        if(!$veiculo){
            return response()->json(['message' => 'Veiculo não encontrado'], 404);
        }

        return response()->json($veiculo, 200);
    }

    public function update(Request $request, int $id) {
        try{

            $veiculo = Veiculo::whereId($id)->first();

            if(!$veiculo){
                return response()->json(['message' => 'Veiculo não encontrado'], 404);
            }

            $veiculo->fill($request->all())->save();

            return response()->json($veiculo, 200);

        }catch (\Throwable $th) {
            return response()->json([
                'message' => 'Erro ao editar o veiculo, tente novamente mais tarde'
            ], 500);
        }
    }

    public function getAll(){
        $veiculos = Veiculo::paginate(10);

        return response()->json($veiculos, 200);
    }

    public function delete(Veiculo $veiculo) {
        try{
            $veiculo->delete();

            return response()->json(['message' => 'Veiculo excluido com sucesso']);
            
        }catch(\Throwable $th){
            return response()->json([
                'message' => 'Erro ao excluir o veiculo, tente novamente mais tarde'
            ], 500);
        }

    }
}
