<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnquiryController extends Controller
{
    //
    public function store(Request $request) { 
        $request->validate([ 'message' => 'required|string|max:1000', ]); 
        Enquiry::create([ 'user_id' => Auth::id(), 'message' => $request->message, ]); 
        return response()->json(['success' => true, 'message' => 'Enquiry submitted successfully']); } 
        
        // Super admin views all enquiries 
        public function index() { 
            $this->authorize('viewAny', Enquiry::class); 
            return response()->json(Enquiry::with('user')->latest()->get()); 
        }
}
