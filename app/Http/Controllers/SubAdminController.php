<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SubAdminController extends Controller
{
    // Show form to create sub-admin 
    public function create() { 
        return Inertia::render('Admin/CreateSubAdmin'); // React page 
    } 
    
    // Handle form submission 
    public function store(Request $request) { 
        $request->validate([ 
            'name' => 'required|string|max:255', 
            'email' => 'required|email|unique:users,email', 
            'password' => 'required|string|min:8', 
        ]); 
        
        $subAdmin = User::create([ 
            'name' => $request->name, 
            'email' => $request->email, 
            'password' => Hash::make($request->password), 
        ]); 
        
        $subAdmin->assignRole('sub-admin'); 
        
        return redirect()->back()->with('success', 'Sub-admin created successfully'); 
    } 
    
    // Sub-admin dashboard 
    public function dashboard() { 
        return Inertia::render('SubAdmin/Dashboard'); 
    }
}
