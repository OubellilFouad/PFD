<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class EtudiantController extends Controller
{
    //

    public function getEtudiant()
    {
        $etudiant = Etudiant::all();
        return response()->json($etudiant);
    }
    public function RegisterEtudiant(Request $request){
        var_dump($request->username);
        $validatedData = $request->validate([
            'userName' => 'required',
            'dateNaiss' => 'required|date',
            'email' => 'required|email|unique:etudiant,email',
            'userID' => 'required|unique:etudiant,userID',
            'dep' => 'required',            
            'specialite' => 'required',            
            'section' => 'required',            
            'group' => 'required',            
            'pallier' => 'required',
            'role' => 'required',
            'password' => 'required',
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
            'password' =>bcrypt($validatedData['password']),
            'dateNaiss' => $validatedData['dateNaiss'],
            'dep' => $validatedData['specialite'],
            'specialite' => $validatedData['specialite'],
            'section' => $validatedData['section'],
            'group' => $validatedData['group'],
            'pallier' => $validatedData['pallier'],
            'role' => $validatedData['role'],
        ]);

        return response('success');
    }
    
}