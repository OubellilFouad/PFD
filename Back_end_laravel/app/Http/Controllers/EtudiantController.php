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
            'group' => $validatedData['group'],
            'pallier' => $validatedData['pallier'],
            'role' => $validatedData['role'],
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
    public function loginEtudiant(Request $request)
    {
        $credentials = [
            'userID' => $request->userID,
            'email' => $request->email,
            'password' => $request->password,
        ];
        if(Auth::attempt($credentials)){
            $etudiant = Auth::etudiant();
            $cookie = cookie('etudiant_id',$etudiant->id,1440);
            return redirect()->intended('/')->withCookie($cookie);
        
        }
        return back()->withErrors([
            'email'=> 'Credentials do not match' 
        ]);
    }
    
}