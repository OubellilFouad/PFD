<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\adminController;
use App\Http\Controllers\ChefDepController;
use App\Http\Controllers\EnseignantController;
use App\Http\Controllers\EtudiantController;

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
Route::middleware('auth:sanctum')->group(function(){
    Route::get('user',[authController::class,'user']);
    Route::get('logout',[authController::class,'logout']);
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
Route::group(['prefix' => 'chefdep'], function() {
    
    Route::post('/ajouter-enseignant', [ChefDepController::class,'ajouterEnseignant'])->name('ajouter-enseignant');
    Route::put('/modifier-enseignant/{id}', [ChefDepController::class,'modifierEnseignant'])->name('modifier-enseignant');
    Route::get('/get-enseignant', [ChefDepController::class,'getEnseignant'])->name('get-enseignant');
    Route::delete('/supprimer-enseignant/{id}', [ChefDepController::class,'deleteEnseignant'])->name('supprimer-enseignant');
    Route::get('/get-enseignantbydepid/{depId}', [ChefDepController::class,'getEnseignantByDepId'])->name('get-enseignantbydepid');
    Route::get('/get-enseignantbyid/{userID}', [ChefDepController::class,'getEnseignantById'])->name('get-enseignantbyid');

});
Route::group(['prefix' => 'prof'], function() {

    Route::get('/get-enseignantchoix', [EnseignantController::class,'getEnseignantChoix'])->name('get-enseignantchoix');

    Route::get('/get-enseignantdisponibilité', [EnseignantController::class,'getEnseignantDisponibility'])->name('get-enseignantdisponibilité');

    Route::post('/choixmodules-enseignant/{id}', [EnseignantController::class,'choixmodule'])->name('choixmodules-enseignant');

    Route::post('/cours-enseignant/{id}', [EnseignantController::class,'cours'])->name('cours-enseignant');

    Route::post('/disponibilité-enseignant/{id}', [EnseignantController::class,'disponibilité'])->name('disponibilité-enseignant');

    Route::get('/enseignant-choix/{id}', [EnseignantController::class,'getChoixByEnseignantId']);

    Route::get('/enseignants-disponibilité/{id}', [EnseignantController::class,'getDisponibiliteByEnseignantId']);

    Route::get('/enseignants-cours/{id}', [EnseignantController::class,'getCourByEnseignantId']);

});
Route::group(['prefix' => 'student'], function() {

    Route::post('signup', [EtudiantController::class,'RegisterEtudiant']);

});



Route::group(['prefix' => 'etudiant'], function() {

    Route::get('/get-etudiant', [EtudiantController::class,'getEtudiant'])->name('get-etudiant');
    Route::post('/register-etudiant', [EtudiantController::class,'RegisterEtudiant'])->name('register-etudiant');
    Route::post('/login-etudiant', [EtudiantController::class,'loginEtudiant'])->name('login-etudiant');

});