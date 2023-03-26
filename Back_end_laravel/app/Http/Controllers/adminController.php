<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChefDep;
use App\Models\Gestionnaire;

class adminController extends Controller
{
    public function getChefDep()
    {
        $chefDep = ChefDep::all();
        return response()->json($chefDep);
    }
    public function getChefDepByDepId($depId) {
        $oneChefDep = ChefDep::where('depID', $depId)->first();
        return response()->json($oneChefDep);
      }
    public function ajouterChefDep(Request $request)
    {
        $validatedData = $request->validate([
            'userName' => 'required',
            'email' => 'required|email|unique:chefdep,email',
            'userID' => 'required|unique:chefdep,userID',
            'dateNaiss' => 'required|date',
            'role' => 'required',
            'depID' => 'required'
        ]);

        // Check if the user already exists
        $userExists = ChefDep::where('email', $request->email)->orWhere('userID', $request->userID)->exists();

        if ($userExists) {
            return response()->json([
                'success' => false,
                'message' => 'User already exists'
            ]);
        }

        // Create the new user
        $chefdep = ChefDep::create([
            'userName' => $validatedData['userName'],
            'email' => $validatedData['email'],
            'userID' => $validatedData['userID'],
            'dateNaiss' => $validatedData['dateNaiss'],
            'role' => $validatedData['role'],
            'depID' => $validatedData['depID']
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $chefdep
        ]);
    }

    public function modifierChefDep(Request $request, $id)
    {
        
        $this->validate($request, [
            'userName' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:chefdep,email,'.$id,
            'userID' => 'required|string|max:255|unique:chefdep,userID,'.$id,
            'dateNaiss' => 'required|date',
        ]);

        
        $chefdep = ChefDep::find($id);

        // Check if the ChefDep model exists
        if (!$chefdep) {
            return response()->json([
                'error' => 'ChefDep not found'
            ], 404);
        }

        // Update the ChefDep model with the new data
        $chefdep->userName = $request->userName;
        $chefdep->email = $request->email;
        $chefdep->userID = $request->userID;
        $chefdep->dateNaiss = $request->dateNaiss;
        $chefdep->save();

        return response()->json([
            'message' => 'ChefDep updated successfully',
            'chefdep' => $chefdep
        ]);
    }



    public function deleteChefDep($id)
    {
        $chefDep = ChefDep::find($id);
        if (!$chefDep) {
            return response()->json(['error' => 'ChefDep not found'], 404);
        }
        $chefDep->delete();
        return response()->json(['message' => 'ChefDep deleted successfully']);
    }




    // gestionnaire 
    public function getGestionnaire()
    {
        $gestionnaire = Gestionnaire::all();
        return response()->json($gestionnaire);
    }

    
    public function ajouterGestionnaire(Request $request)
    {
        $validatedData = $request->validate([
            'userName' => 'required',
            'email' => 'required|email|unique:gestionnaire,email',
            'userID' => 'required|unique:gestionnaire,userID',
            'dateNaiss' => 'required|date',
            'role' => 'required',
            'type' => 'required',
            'domain' => 'required',
        ]);

        // Check if the gestionnaire already exists
        $userExists = Gestionnaire::where('email', $request->email)->orWhere('userID', $request->userID)->exists();

        if ($userExists) {
            return response()->json([
                'success' => false,
                'message' => 'User already exists'
            ]);
        }

        // Create the new user
        $gestionnaire = Gestionnaire::create([
            'userName' => $validatedData['userName'],
            'email' => $validatedData['email'],
            'userID' => $validatedData['userID'],
            'dateNaiss' => $validatedData['dateNaiss'],
            'role' => $validatedData['role'],
            'type' => $validatedData['type'],
            'domain' => $validatedData['domain'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $gestionnaire
        ]);
    }

    public function modifierGestionnaire(Request $request, $id)
    {
        
        $this->validate($request, [
            'userName' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:gestionnaire,email,'.$id,
            'userID' => 'required|string|max:255|unique:gestionnaire,userID,'.$id,
            'dateNaiss' => 'required|date',
            'role' => 'required',
            'type' => 'required',
            'domain' => 'required',
        ]);

        
        $gestionnaire = Gestionnaire::find($id);

        // Check if the Gestionnaire model exists
        if (!$gestionnaire) {
            return response()->json([
                'error' => 'Gestionnaire not found'
            ], 404);
        }

        // Update the Gestionnaire model with the new data
        $gestionnaire->userName = $request->userName;
        $gestionnaire->email = $request->email;
        $gestionnaire->userID = $request->userID;
        $gestionnaire->dateNaiss = $request->dateNaiss;
        $gestionnaire->role = $request->role;
        $gestionnaire->type = $request->type;
        $gestionnaire->domain = $request->domain;
        $gestionnaire->save();

        return response()->json([
            'message' => 'Gestionnaire updated successfully',
            'gestionnaire' => $gestionnaire
        ]);
    }



    public function deleteGestionnaire($id)
    {
        $gestionnaire =Gestionnaire::find($id);
        if (!$gestionnaire) {
            return response()->json(['error' => 'Gestionnaire not found'], 404);
        }
        $gestionnaire->delete();
        return response()->json(['message' => 'Gestionnaire deleted successfully']);
    }
}