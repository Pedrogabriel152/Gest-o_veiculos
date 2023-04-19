<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

class validationsVeiculos
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        
        if(!$request->modelo){
            return response()->json(['message' => 'O modelo é obrigatório'], 402);
        }

        if(!$request->marca){
            return response()->json(['message' => 'A marca é obrigatória'], 402);
        }

        if(!$request->placa){
            return response()->json(['message' => 'A placa é obrigatória'], 402);
        }

        if(!$request->cor){
            return response()->json(['message' => 'A cor é obrigatória'], 402);
        }

        if(!$request->ano){
            return response()->json(['message' => 'O ano é obrigatório'], 402);
        }

        if(!$request->tipo){
            return response()->json(['message' => 'O tipo do veiculo é obrigatório'], 402);
        }

        return $next($request);
    }
}
