<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OwnerMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $roles = ['owner'];
        $fileId = $request->route('file');

        $user = $request->authenticated_user;
        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
        $hasRole = $user->files()
            ->where('file_id', $fileId)
            ->whereIn('role', $roles)
            ->exists();

        if (!$hasRole) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $request->attributes->add([
            'user' => $user,
            'file_id' => $fileId,
        ]);
        return $next($request);
    }
}
