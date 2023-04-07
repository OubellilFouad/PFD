<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class EnseignantController extends Controller
{
    //
    public function choixmodules(Request $request){

    $validatedData = $request->validate([
        'ens_id' => 'required|numeric',
        'choix' => 'required|array',
    ]);
    
    $ens_id = $validatedData['ens_id'];
    $choix = $validatedData['choix'];
    
    DB::table('ens_module_choices')->insert([
            'ens_id' => $ens_id,
            'choix' => $choix,
    ]);
    
    return response()->json(['message' => 'Module choices inserted successfully']);
    }
}