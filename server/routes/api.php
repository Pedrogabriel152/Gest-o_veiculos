<?php

use App\Http\Controllers\API\EmpresaController;
use App\Http\Middleware\validationsCompany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(validationsCompany::class)->group(function () {
    Route::controller(EmpresaController::class)->group(function () {
        Route::post('/register', 'register');
        Route::post('/login', 'login');

        Route::prefix('company')->group(function (){
            Route::get('edit', 'edit');
        });
    });
});
