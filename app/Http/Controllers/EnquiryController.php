<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnquiryController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Enquiry::class);
        return inertia('Admin/Enquiries', [
            'enquiries' => Enquiry::with('user')->latest()->get(),
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

    public function store(Request $request) { 
        $request->validate([ 'message' => 'required|string|max:1000', ]); 
        Enquiry::create([ 'user_id' => Auth::id(), 'message' => $request->message, ]); 
        return response()->json(['success' => true, 'message' => 'Enquiry submitted successfully']); 
    } 
        
    // Super admin views all enquiries 
    // public function index() { 
    //     $this->authorize('viewAny', Enquiry::class); 
    //     return response()->json(Enquiry::with('user')->latest()->get()); 
    // }
}
