<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Auth; 

class JWTAuthController extends Controller{
    
    public function register(Request $request){
        $user = new User;
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;
        $user->role = $request->role;
        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->json([
            "user" => $user,
            "token" => $token
        ], 201);
    }

    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }

            $user = JWTAuth::user();

            return response()->json([
                "user" => $user, 
                "token" => $token
            ], 201);

        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }
    }

}
