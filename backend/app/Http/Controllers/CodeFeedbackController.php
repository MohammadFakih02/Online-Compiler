<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use OpenAI\Laravel\Facades\OpenAI;

class CodeFeedbackController extends Controller
{
    public function submitCode(Request $request)
    {
        $codeLine = $request->input('code_line');

        if (!$codeLine) {
            return response()->json(['error' => 'No code line provided.'], 400);
        }

        try {
            // Use the OpenAI chat completion API
            $response = OpenAI::chat()->create([
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'user',
                        'content' => "You are a software developer assistant. Analyze the following line of code and suggest corrections or improvements. Return a single-line suggestion mention errors and correction: {$codeLine}",
                    ],
                ],
            ]);

            // Extract the feedback
            $feedback = $response['choices'][0]['message']['content'] ?? 'No feedback available.';

            return response()->json([
                'feedback' => $feedback,
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            Log::error('OpenAI API error: ' . $e->getMessage());

            return response()->json(['error' => 'Something went wrong with the OpenAI API.'], 500);
        }
    }
}
