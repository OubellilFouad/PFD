<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\adminController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login',[authController::class,'login']);
Route::post('logout',[authController::class,'logout']);
Route::middleware('auth:sanctum')->group(function(){
    Route::get('user',[authController::class,'user']);
});


Route::group(['prefix' => 'admin'], function() {
    
    Route::post('/ajouter-chefdep', [adminController::class,'ajouterChefDep'])->name('ajouter-chefdep');
    Route::put('/modifier-chefdep/{id}', [adminController::class,'modifierChefDep'])->name('modifier-chefdep');
    Route::get('/get-chefdep', [adminController::class,'getChefDep'])->name('get-chefdep');

    Route::get('/get-chefdepbydepid/{depId}', [adminController::class,'getChefDepByDepId'])->name('get-chefdepbydepid');
    Route::delete('/supprimer-chefdep/{id}', [adminController::class,'deleteChefDep'])->name('supprimer-chefdep');



   // gestionnaire routes 
    Route::post('/ajouter-gestionnaire', [adminController::class,'ajouterGestionnaire'])->name('ajouter-gestionnaire');
    Route::put('/modifier-gestionnaire/{id}', [adminController::class,'modifierGestionnaire'])->name('modifier-gestionnaire');
    Route::get('/get-gestionnaire', [adminController::class,'getGestionnaire'])->name('get-gestionnaire');
    Route::delete('/supprimer-gestionnaire/{id}', [adminController::class,'deleteGestionnaire'])->name('supprimer-gestionnaire');

  
});