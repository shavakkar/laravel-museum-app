<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        $locations = Location::where('name', 'like', "%{$query}%")
            ->orWhere('locality', 'like', "%{$query}%")
            ->orWhere('district', 'like', "%{$query}%")
            ->orWhere('city', 'like', "%{$query}%")
            ->orWhere('state', 'like', "%{$query}%")
            // ->limit(10) // keep it fast
            ->get();

        return response()->json($locations);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $locations = Location::all();
        return inertia('Admin/Locations', ['locations' => $locations]);
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
            'name' => 'required|string|unique:locations,name',
            'locality' => 'required|string',
            'district' => 'required|string',
            'city' => 'required|string',
            'state' => 'required|string',
        ]);

        Location::create($request->only('name', 'locality', 'district', 'city', 'state'));

        return redirect()->back()->with('success', 'Location added successfully');
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
    public function update(Request $request, Location $location)
    {
        $request->validate([
            'name' => 'required|string|unique:locations,name,' . $location->id,
            'locality' => 'nullable|string',
            'district' => 'nullable|string',
            'city' => 'nullable|string',
            'state' => 'nullable|string',
        ]);

        $location->update($request->only('name', 'locality', 'district', 'city', 'state'));

        return redirect()->back()->with('success', 'Location updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        $location->delete();
        return redirect()->back()->with('success', 'Location deleted successfully');
    }
}
