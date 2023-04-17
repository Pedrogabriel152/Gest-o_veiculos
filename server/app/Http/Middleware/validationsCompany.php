<?php

namespace App\Http\Middleware;

use App\Models\Empresa;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Route;

session_start();

class validationsCompany
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $rotaRegister = "api/register";
        $rotaEdit = "api/company/edit";
        $rotaUpdate = "api/company/update";

        if(Route::getCurrentRoute()->uri === $rotaEdit) {
            return $next($request);
        }
        
        if(!$request->email){
            return response()->json(['message' => 'O e-mail é obrigatório'], 402);
        }

        if(Route::getCurrentRoute()->uri === $rotaUpdate) {

            if($request->password) {
                if(!$request->password){
                    return response()->json(['message' => 'A senha é obrigatória'], 402);
                }
                if(!$request->confirmpassword){
                    return response()->json(['message' => 'A confirmação da senha é obrigatória'], 402);
                }
    
                if($request->confirmpassword !== $request->password){
                    return response()->json(['message' => 'As senhas precisam ser identicas'], 402);
                }
            }
            
            if(!$request->name){
                return response()->json(['message' => 'O nome é obrigatório'], 402);
            }
            
            return $next($request);
        }

        if(!$request->password){
            return response()->json(['message' => 'A senha é obrigatória'], 402);
        }

        if(Route::getCurrentRoute()->uri === $rotaRegister){
            if(!$request->confirmpassword){
                return response()->json(['message' => 'A confirmação da senha é obrigatória'], 402);
            }

            if($request->confirmpassword !== $request->password){
                return response()->json(['message' => 'As senhas precisam ser identicas'], 402);
            }

            if(!$request->name){
                return response()->json(['message' => 'O nome é obrigatório'], 402);
            }


            // Validation if user exist
            $empresa = Empresa::whereEmail($request->email)->first();

            if($empresa) {
                return response()->json(['message' => "Empresa já existe"], 402);
            }
        }

        return $next($request);
    }
}
