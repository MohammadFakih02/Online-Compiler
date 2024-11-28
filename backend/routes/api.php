<?php

use App\Http\Controllers\CodeExecutionController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\JWTAuthController;
use App\Http\Controllers\OwnerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\CodeFeedbackController;

Route::post("/register", [JWTAuthController::class, "register"]);
Route::post("/login", [JWTAuthController::class, "login"]);

Route::post("/upload", [FileController::class,"saveFile"]);

Route::post('/execute-code', [CodeExecutionController::class,'execute']);