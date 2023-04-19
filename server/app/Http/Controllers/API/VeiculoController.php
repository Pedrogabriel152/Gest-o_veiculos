<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Repositories\VeiculoRepository;
use App\Models\Empresa;
use App\Models\Veiculo;

session_start();

class VeiculoController extends Controller
{
    public function create(Request $request) {
        $newVeiculo = VeiculoRepository::register($request);

        if(!$newVeiculo) {
            return response()->json(['message' => 'Falha ao registrar um novo veiculo, tente novamente mais tarde'], 500);
        }

        return response()->json($newVeiculo, 200);
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

    public function getAll(Request $request){
        try{     
            $empresa = Empresa::whereEmail($request->header('email'))->first();               
            $veiculos = Veiculo::where('id_empresa', '=', $empresa->id)->paginate(15);

            return response()->json($veiculos, 200);
        }catch (\Throwable $th) {
            return response()->json([
                'message' => 'Erro no sevidor, tente novamente mais tarde'
            ], 500);
        }
    }

    public function delete(Veiculo $veiculo, Request $request) {
        try{
            $empresa = Empresa::whereEmail($request->header('email'))->first();
            
            if($veiculo->id_empresa !== $empresa->id){
                return response()->json(['message' => 'Sem permição para excluir esse veiculo'], 403);
            }

            $veiculo->delete();

            return response()->json(['message' => 'Veiculo excluido com sucesso']);
            
        }catch(\Throwable $th){
            return response()->json([
                'message' => 'Erro ao excluir o veiculo, tente novamente mais tarde'
            ], 500);
        }

    }
}
