<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\SampleEmail;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'email' => 'required|email',
            'name' => 'required|string|max:255',
        ]);

        $email = $validatedData['email'];
        $name = $validatedData['name'];

        // Send email
        Mail::to($email)->send(new SampleEmail($name));

        return response()->json(['message' => 'Email sent successfully!']);
    }
}

