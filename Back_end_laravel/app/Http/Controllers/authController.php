<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\ChefDep;
use App\Models\Gestionnaire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            "email" => ["required" , 'string'],
            "password" => ["required" , 'string'],
            "userID" => ["required", 'string']
        ]);
        $email = $request->email;
        $password = $request->password;

        $chefdep = ChefDep::where('email', $request->email)->orWhere('userID', $request->userID)->first();        
        if($chefdep){
            $pw =  $chefdep->password;
            if($pw == null) {

                $pw = Hash::make($password);
                $chefdep->password = $pw;
                $chefdep->save();
            }
            else{
                if($request->password != $chefdep->password) return response(["message" => "Invalid pw"]);
                if($request->email != $chefdep->email) return response(["message" => "Invalid email"]);
                if($request->userID != $chefdep->userID) return response(["message" => "Invalid ID"]);
            
            }
            $token = $chefdep->createToken('myApp')->plainTextToken;
            $cookie = cookie('jwt' , $token , 3600);
            return response([
                "message"=> 'Success',
            ])->withCookie($cookie);
            
        }
        $gestionnaire = Gestionnaire::where('email', $request->email)->orWhere('userID', $request->userID)->first();

        if($gestionnaire){
            $pw =  $gestionnaire->password;
            if($pw == null) {
                $pw = Hash::make($password);
                $gestionnaire->password = $pw;
                $gestionnaire->save();
            }
            else{
                if($request->password != $gestionnaire->password) return response(["message" => "Invalid pw"]);
                if($request->email != $gestionnaire->email) return response(["message" => "Invalid email"]);
                if($request->userID != $gestionnaire->userID) return response(["message" => "Invalid ID"]);
            
            }
            $token = $gestionnaire->createToken('myApp')->plainTextToken;
            $cookie = cookie('jwt' , $token , 3600);
            return response([
                "message"=> 'Success',
            ])->withCookie($cookie);
            
        }
        
        
        $admin = Admin::where("email",$request->email)->first();
        if(!$admin) return response(["message" => "Invalid email"]);
        if($request->password != $admin->password) return response(["message" => "Invalid pw"]);
        if($request->userID != $admin->userID) return response(["message" => "Invalid ID"]);
        // return $admin;

        // $token = csrf_token();
        $token = $admin->createToken('myApp')->plainTextToken;
        $cookie = cookie('jwt' , $token , 3600);
        return response([
            "message"=> 'Success',
        ])->withCookie($cookie);
        
    }
    public function user(){
        return Auth::user();
    }
    public function logout(Request $request){
        $cookie = Cookie::forget('jwt');
        return response([
            'message' => $cookie
        ])->withCookie($cookie);
    }
}