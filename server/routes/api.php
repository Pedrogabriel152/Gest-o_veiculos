<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\authValidations;
use App\Http\Middleware\validationsCompany;
use App\Http\Middleware\validationsVeiculos;
use App\Http\Controllers\API\EmpresaController;
use App\Http\Controllers\API\VeiculoController;

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

        Route::middleware(authValidations::class)->group(function () {
            Route::prefix('company')->group(function (){
                Route::get('edit', 'edit');
                Route::patch('update', 'update');
            });
        });
    });
});

Route::controller(EmpresaController::class)->group(function () {
    Route::get('/logout', 'logout')->middleware(authValidations::class);
});

Route::middleware(authValidations::class)->group(function () {
    Route::controller(VeiculoController::class)->group(function() {
        Route::middleware(validationsVeiculos::class)->group(function () {
            Route::post('/vehicles/create', 'create');
            Route::patch('/vehicles/update/{id}', 'update');
        });

        Route::get('/vehicles/edit/{id}', 'edit');
        Route::get('/vehicles', 'getAll');
        Route::delete('/vehicles/delete/{veiculo}', 'delete');
    });
});