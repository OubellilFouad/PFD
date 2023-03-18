<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class authController extends Controller
{
    public function login(Request $request){
        $adminData = $request->validate([
            'email' => ['required','string'],
            'password' => ['required','string'],
        ]);
        $admin = Admin::where("email",$request->email)->first();
        if(!$admin) {
            return response(["message" => "Email Not found"]);
        }
        if(!Hash::check($request->password, $admin->password)) {
            return response(["message" => "Password incorrect"]);
        }
        $token = $admin->createToken("token")->plainTextToken;
        return response([
            "admiin" => $admin,
            "token" => $token
        ]);
        // return $admin;
    }
    
}