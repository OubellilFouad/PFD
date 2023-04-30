<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    //

    public function getEtudiant()
    {
        $etudiant = Etudiant::all();
        return response()->json($etudiant);
    }
    public function RegisterEtudiant(Request $request){
        $validatedData = $request->validate([
            'nom' => 'required',
            'prenom' => 'required',
            'password' => 'required',
            'dateNaiss' => 'required|date',
            'email' => 'required|email|unique:etudiants,email',
            'userID' => 'required|unique:etudiant,userID',
            'filliere' => 'required',
            'specialite' => 'required',            
            'section' => 'required',            
            'group' => 'required',            
            'pallier' => 'required',            
       
        ]);

        // Check if the user already exists
        $userExists = Etudiant::where('email', $request->email)->orWhere('userID', $request->userID)->exists();

        if ($userExists) {
            return response()->json([
                'success' => false,
                'message' => 'Etudiant already exists'
            ]);
        }

        // Create the new user
        $etudiant = Etudiant::create([
            'nom' => $validatedData['nom'],
            'prenom' => $validatedData['prenom'],
            'email' => $validatedData['email'],
            'userID' => $validatedData['userID'],
            'dateNaiss' => $validatedData['dateNaiss'],
            'specialite' => $validatedData['specialite'],
            'filliere' => $validatedData['filliere'],
            'section' => $validatedData['section'],
            'groupe' => $validatedData['groupe'],
            'pallier' => $validatedData['pallier'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $etudiant
        ]);
    }
    
}