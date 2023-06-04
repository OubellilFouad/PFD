<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\Enseignant;

class EnseignantController extends Controller
{


    //delete enseignant
    public function deleteEnseignantByDepID($depID)
    {
        $enseignants = Enseignant::where('depID', $depID)->get();

        foreach ($enseignants as $enseignant) {
            $enseignant->delete();
        }

        return response()->json(['message' => 'Teachers deleted successfully.']);
    }
       // get Choix

    public function getEnseignantChoix()
    {
        $enseignants = Enseignant::all();
        $enseignantChoix = [];

        foreach ($enseignants as $enseignant) {
            $choix = explode(',', $enseignant->choix);
            $enseignantChoix[] = [
                'Enseignant' => $enseignant->name,
                'choix' => $choix,
            ];
        }

        return response()->json($enseignantChoix);
    }
        // get Choix by enseignant id

    public function getChoixByEnseignantId($id)
    {
        $enseignant = Enseignant::find($id);

        if (!$enseignant) {
            return response()->json(['error' => 'Enseignant not found'], 404);
        }

        $choix = $enseignant->choix;

        return response()->json(['choices' => $choix]);
    }
    // get Disponibilité 

    public function getEnseignantDisponibility()
    {
        $enseignants = Enseignant::all();
        $enseignantDisponibility = [];

        foreach ($enseignants as $enseignant) {
            $disponibility = explode(',', $enseignant->disponibilité);
            $enseignantDisponibility[] = [
                'teacher_name' => $enseignant->name,
                'availability' => $disponibility,
            ];
        }

        return response()->json($enseignantDisponibility);
    }
    // get Disponibilité by enseignant id
    public function getDisponibiliteByEnseignantId($enseignantId)
    {
        $enseignant = Enseignant::find($enseignantId);

        if (!$enseignant) {
            return response()->json(['error' => 'Enseignant not found'], 404);
        }

        $disponibilite = $enseignant->disponibilité;

        return response()->json(['disponibilite' => $disponibilite]);
    }
    public function choixmodule(Request $request,$id){
        $enseignant = Enseignant::find($id);
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
    public function disponibilité(Request $request, $id){

        $enseignant = Enseignant::find($id);

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
    public function cours(Request $request,$id){
        $enseignant = Enseignant::find($id);
        if (!$enseignant) {
            return response()->json(['error' => 'Enseignant not found'], 404);
        }

        $cours = $request->input('cours');

        if (empty($cours)) {
            return response()->json(['error' => 'No choix provided'], 400);
        }

        $enseignant->cours = $cours;
        $enseignant->save();

        return response()->json(['success' => true]);
    }
    public function getCourByEnseignantId($id)
    {
        $enseignant = Enseignant::find($id);

        if (!$enseignant) {
            return response()->json(['error' => 'Enseignant not found'], 404);
        }

        $cours = $enseignant->cours;

        return response()->json(['cours' => $cours]);
    }
}