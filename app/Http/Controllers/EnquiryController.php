<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnquiryController extends Controller
{
    public function index()
    {
        $enquiries = Enquiry::with('user')->latest()->get();

        return inertia('Admin/Enquiries', [
            'enquiries' => $enquiries,
        ]);
    }

    public function create()
    {
        return inertia('User/Enquiry'); // React page
    }
    
    public function destroy(Enquiry $enquiry)
    {
        $this->authorize('delete', $enquiry);
        $enquiry->delete();

        return redirect()->back()->with('success', 'Enquiry deleted successfully');
    }

    public function store(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
            'email'   => Auth::check() ? 'nullable|email' : 'required|email',
        ]);
    
        $email   = Auth::check() ? Auth::user()->email : $request->email;
        $userId  = Auth::id();
    
        // Try to auto-link guest enquiry to existing user by email
        if (!$userId) {
            $existingUser = User::where('email', $email)->first();
            if ($existingUser) {
                $userId = $existingUser->id;
            }
        }
    
        $enquiry = Enquiry::create([
            'user_id' => $userId,   // may be null if guest and no match
            'email'   => $email,
            'message' => $request->message,
        ]);
    
        return response()->json([
            'success' => true,
            'message' => 'Enquiry submitted successfully',
            'userId'  => $enquiry->user_id, // return what was actually stored
        ]);
    }
}
