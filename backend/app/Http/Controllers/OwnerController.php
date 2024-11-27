<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class OwnerController extends Controller
{
    public function invite(Request $request)
    {
        //for emails
    }
    public function save(Request $request)
    {
        //
    }



    public function updateRole(Request $request, $fileId, $userId)
    {
        $authUser = $request->attributes->get('user');
        
        $file = File::find($fileId);
        if (!$file) {
            return response()->json(['error' => 'File not found'], 404);
        }

        $targetUser = User::find($userId);
        if (!$targetUser) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        $existingRole = $file->users()->where('user_id', $userId)->first();
        if (!$existingRole) {
            return response()->json(['error' => 'User does not have access to this file'], 404);
        }

        $existingRole->pivot->role = $request->input('role');
        $existingRole->pivot->save();

        // 6. Return success response
        return response()->json(['message' => 'Role updated successfully']);
    }

}
