<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;

class BookingsController extends Controller
{
    
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookings = Booking::all();
        return inertia('Admin/Bookings', ['bookings' => $bookings]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $request->validate([
            'user_id' => [
                'nullable',
                'string',
                Rule::unique('bookings', 'user_id')
                    ->ignore($booking->id)
                    ->where(fn ($q) => $q->whereNot('user_id', 'Guest')),
            ],
            'email' => 'required|string',
            'location' => 'required|string',
            'number' => 'required|string',
        ]);

        $booking->update($request->only('user_id', 'email', 'location', 'number'));

        return redirect()->back()->with('success', 'Booking updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        // Remove if you don’t have a BookingPolicy
        // $this->authorize('delete', $booking);

        $booking->delete();

        return redirect()->back()->with('success', 'Booking deleted successfully');
    }
}
