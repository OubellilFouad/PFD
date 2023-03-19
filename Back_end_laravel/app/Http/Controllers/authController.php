<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            "email" => ["required" , 'string'],
            "password" => ["required" , 'string'],
            "userID" => ["required"]
        ]);
        $admin = Admin::where("email",$request->email)->first();
        if(!$admin) return response(["message" => "Invalid email"]);
        if($request->password != $admin->password) return response(["message" => "Invalid pw"]);
        // return $admin;

        // $token = csrf_token();
        $token = $admin->createToken('myApp')->plainTextToken;
        $cookie = cookie('jwt' , $token , 60);
        return response([
            "admin" => $admin,
            "token" => $token
        ])->withCookie($cookie);
        
    }
}