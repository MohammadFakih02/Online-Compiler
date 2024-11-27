<?php

use App\Http\Controllers\JWTAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;


Route::post("/register", [JWTAuthController::class, "register"]);
Route::post("/login", [JWTAuthController::class, "login"]);
