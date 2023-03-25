<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChefDep;

class adminController extends Controller
{
    public function getChefDep()
    {
        $chefDep = ChefDep::all();
        return response()->json($chefDep);
    }
    public function getChefDepByDepId($depId) {
        return $this->where('depID', $depId)->pluck('chefdep')->first();
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
            'role' => 'required',
            'depID' => 'required'
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
        $chefdep->role = $request->role;
        $chefdep->depID = $request->depID;
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
}