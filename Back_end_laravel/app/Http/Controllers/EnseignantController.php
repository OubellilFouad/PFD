<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Enseignant;

class EnseignantController extends Controller
{
   
    public function choixmodule(Request $request)
    {
        $enseignant = Enseignant::find($request->input('enseignant_id'));

        if (!$enseignant) {
            return response()->json(['error' => 'Enseignant not found'], 404);
        }

        $choix = $request->input('choix');

        if (empty($choix)) {
            return response()->json(['error' => 'No choix provided'], 400);
        }

        $enseignant->choix = $choix;
        $enseignant->save();

        return response()->json(['success' => true]);
    }
    public function disponibilité(Request $request)
{
    $enseignant = Enseignant::find($request->input('enseignant_id'));

    if (!$enseignant) {
        return response()->json(['error' => 'Enseignant not found'], 404);
    }

    $disponibility = $request->input('disponibility');

    if (empty($disponibility)) {
        return response()->json(['error' => 'No disponibility provided'], 400);
    }

    $enseignant->disponibilité = $disponibility;
    $enseignant->save();

    return response()->json(['success' => true]);
}
}