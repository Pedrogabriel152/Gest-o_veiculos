<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Repositories\EmpresaRepository;
use App\Models\Empresa;

session_start();

class EmpresaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function register(Request $request)
    {
        $hash = password_hash($request->password, PASSWORD_BCRYPT);
        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $hash
        ];

        $newEmpresa = EmpresaRepository::register($data);

        if(!$newEmpresa) {
            return response()->json(['message'=> 'Erro ao salvar empresa tente novamente mais tarde']);
        }

        $data = [
            'name' => $newEmpresa->name,
            'email' => $newEmpresa->email,
        ];

        $_SESSION['empresa'] = $data;

        return response()->json($data, 200);
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function login(Request $request)
    {
        // Validando se empresa existe
        $empresa = Empresa::whereEmail($request->email)->first();

        if(!$empresa) {
            return response()->json(['message' => "Email ou senha incorretos"], 404);
        }

        if(!password_verify($request->password, $empresa->password)){
            return response()->json(['message' => "Email ou senha incorretos"], 404);
        }

        $data = [
            'name' => $empresa->name,
            'email' => $empresa->email,
        ];

        $_SESSION['empresa'] = $data;

        return response()->json($data, 200);
    }

    /**
     * Display the specified resource.
     */
    public function edit(string $id)
    {
        dd('aiusgdaisugdiuasgdiguasd');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
