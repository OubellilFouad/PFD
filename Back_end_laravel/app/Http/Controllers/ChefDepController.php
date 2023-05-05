<?php

namespace App\Http\Controllers;

use App\Models\ChefDep;
use App\Models\Enseignant;
use Illuminate\Http\Request;

class ChefDepController extends Controller
{



        //delete chef dep
        public function deleteChefDep($depID){
            $chefdep = ChefDep::where('depID',$depID)->first();
            if($chefdep){
                $chefdep->delete();
                return response()->json(['message' => 'Chef Departement supprimé']);
            }
            else{
                return response()->json(['message' => 'Chef Departement non trouvé']);
                
            }
        }
    public function getEnseignant()
    {
        $enseignant = Enseignant::all();
        return response()->json($enseignant);
    }
    public function getEnseignantByDepId($depId) {
        $enseignants = Enseignant::where('depID', $depId)->get();
        return response()->json($enseignants);
    }
    public function getEnseignantById($userID) {
        $enseignants = Enseignant::where('userID', $userID)->first();
        return response()->json($enseignants);
    }
    public function ajouterEnseignant(Request $request)
    {
        $validatedData = $request->validate([
            'userName' => 'required',
            'email' => 'required|email|unique:enseignant,email',
            'userID' => 'required|unique:enseignant,userID',
            'dateNaiss' => 'required|date',
            'depID' => 'required',
            'grad' => 'required',            
            'role' => 'required',            
            'type' => 'required',            
        ]);

        // Check if the user already exists
        $userExists = Enseignant::where('email', $request->email)->orWhere('userID', $request->userID)->exists();

        if ($userExists) {
            return response()->json([
                'success' => false,
                'message' => 'Enseignant already exists'
            ]);
        }

        // Create the new user
        $enseignant = Enseignant::create([
            'userName' => $validatedData['userName'],
            'email' => $validatedData['email'],
            'userID' => $validatedData['userID'],
            'dateNaiss' => $validatedData['dateNaiss'],
            'role' => $validatedData['role'],
            'depID' => $validatedData['depID'],
            'grad' => $validatedData['grad'],
            'role' => $validatedData['role'],
            'type' => $validatedData['type'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $enseignant
        ]);
    }
    public function modifierEnseignant(Request $request, $id)
    {
        
        $this->validate($request, [
            'userName' => 'string|max:255',
            'email' => 'email|max:255|unique:enseignant,email,'.$id,
            'userID' => 'string|max:255|unique:enseignant,userID,'.$id,
            'dateNaiss' => 'date',
        ]);

        
        
        $enseignant = Enseignant::find($id);

        // Check if the ChefDep model exists
        if (!$enseignant) {
            return response()->json([
                'error' => 'ChefDep not found'
            ], 404);
        }

        // Update the ChefDep model with the new data
        if(!empty($request->input('userName'))) {        
            $enseignant->userName = $request->userName;
        }
        if(!empty($request->input('email'))) {        
            $enseignant->email = $request->email;
        }
        if(!empty($request->input('password'))) {        
            $enseignant->userID = $request->userID;

        }
        if(!empty($request->input('dateNaiss'))) {        
            $enseignant->dateNaiss = $request->dateNaiss;
        }
        $enseignant->save();

        return response()->json([
            'message' => 'ChefDep updated successfully',
            'enseignant' => $enseignant
        ]);
    }
    public function deleteEnseignant($id)
    {
        $enseignant = Enseignant::find($id);
        if (!$enseignant) {
            return response()->json(['error' => 'Enseignant not found'], 404);
        }
        $enseignant->delete();
        return response()->json(['message' => 'Enseignant deleted successfully']);
    }    
}