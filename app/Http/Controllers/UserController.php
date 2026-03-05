<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    // Step 1: Send OTP
    public function sendOtp(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $otp = rand(100000, 999999); // 6-digit OTP
        Session::put('otp', $otp);
        Session::put('otp_email', $request->email);

        // Send OTP via email
        Mail::raw("Your OTP is: $otp", function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Your OTP Code');
        });

        return response()->json(['success' => true, 'message' => 'OTP sent to email']);
    }

    // Step 2: Verify OTP
    public function verifyOtp(Request $request)
    {
        $request->validate(['otp' => 'required|string']);

        $storedOtp = (string) Session::get('otp');
        $inputOtp  = (string) $request->otp;

        Log::info('Stored OTP: ' . $storedOtp);
        Log::info('Input OTP: ' . $inputOtp);

        if ($storedOtp === $inputOtp) {
            Session::put('otp_verified', true);
            return response()->json(['success' => true, 'message' => 'OTP verified']);
        }

        return response()->json(['success' => false, 'message' => 'Invalid OTP'], 422);
    }

    // Step 3: Final form submission
    public function store(Request $request)
    {
        $request->validate([
            'location' => 'required|string|max:50',
            'number' => 'required|numeric',
            'email'  => 'required|email',
        ]);

        // Ensure OTP verified for guests
        if (!Auth::check() && !Session::get('otp_verified')) {
            return response()->json(['success' => false, 'message' => 'OTP not verified'], 422);
        }

        $userId = Auth::id();

        // Optional: auto-link guest email to existing user
        if (!$userId) {
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                $userId = $existingUser->id;
            }
        }

        $form = Booking::create([
            'user_id' => $userId,
            'email'   => $request->email,
            'location'  => $request->location,
            'number'  => $request->number,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Form submitted successfully',
            'form'    => $form,
        ]);
    }
}
