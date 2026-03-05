<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class AdminController extends Controller
{
    // Only super-admin can access this controller
    public function __construct()
    {
        $this->middleware('role:super-admin');
    }

    // Show all sub-admins
    public function index()
    {
        $subAdmins = User::role('sub-admin')->get();
        return Inertia::render('Admin/Index', [
            'subAdmins' => $subAdmins
        ]);
    }

    // Create a new sub-admin
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $user->assignRole('sub-admin');

        return redirect()->route('admin.index')->with('success', 'Sub-admin created successfully.');
    }

    // Delete sub-admin
    public function destroy(User $user)
    {
        if ($user->hasRole('sub-admin')) {
            $user->delete();
        }
        return redirect()->route('admin.index')->with('success', 'Sub-admin deleted.');
    }
}
