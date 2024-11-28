<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

class FileController extends Controller
{
    public function generateToken(Request $request, $fileId)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 403);
        }

        $file = File::find($fileId);
        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $role = $user->files()->where('file_id', $fileId)->first();
        
        if (!$role) {
            return response()->json(['error' => 'User does not have access to this file'], 403);
        }

        $payload = [
            'user_id' => $user->id,
            'name' => $user->name,
            'role' => $role->pivot->role,
            'file_id' => $fileId,
        ];

        $token = JWTAuth::fromUser($payload);

        return response()->json(['token' => $token]);
    }

    public function saveFile(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
        ]);
    
        $filePath = 'code.txt';
    
        if (Storage::disk('public')->put($filePath, $request->content)) {
            $url = Storage::url($filePath);
            return response()->json([
                'message' => 'File saved successfully!',
                'url' => $url,
            ], 200);
        } else {
            return response()->json(['message' => 'Failed to save file.'], 500);
        }
    }
    
    public function fetchFile()
{
    $filePath = 'code.txt';
    $disk = Storage::disk('public');

    if ($disk->exists($filePath)) {
        $content = $disk->get($filePath);
        return response()->json([
            'message' => 'File found!',
            'content' => $content,
        ], 200);
    } else {
        return response()->json([
            'message' => 'File not found.',
        ], 404);
    }
}

}
