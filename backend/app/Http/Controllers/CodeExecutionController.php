<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class CodeExecutionController extends Controller
{
    public function execute(Request $request)
    {
        $language = $request->input('language');
        $code = $request->input('code');

        try {
            // Map language to command
            $command = match ($language) {
                'javascript' => ['C:\\Program Files\\nodejs\\node.exe', '-e', $code],
                'python' => ['C:\\Users\\moudi\\AppData\\Local\\Programs\\Python\\Python313\\python.exe', '-c', $code],
                'csharp' => ['dotnet-script', $code],
                default => throw new \Exception("Unsupported language"),
            };

            // Execute code
            $process = new Process($command);
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }

            return response()->json([
                'success' => true,
                'output' => $process->getOutput(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
