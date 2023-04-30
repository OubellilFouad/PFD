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
            'userName' => 'required',
            'dateNaiss' => 'required|date',
            'email' => 'required|email|unique:etudiants,email',
            'userID' => 'required|unique:etudiant,userID',
            'dep' => 'required',            
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
            'userName' => $validatedData['userName'],
            'email' => $validatedData['email'],
            'userID' => $validatedData['userID'],
            'dateNaiss' => $validatedData['dateNaiss'],
            'dep' => $validatedData['specialite'],
            'specialite' => $validatedData['specialite'],
            'section' => $validatedData['section'],
            'groupe' => $validatedData['groupe'],
            'pallier' => $validatedData['pallier'],
        ]);

        $pw = Hash::make($request->password);
        $etudiant->password = $pw;
        $etudiant->save();

        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $etudiant
        ]);
    }
    
}