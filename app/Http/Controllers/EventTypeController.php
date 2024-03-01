<?php

namespace App\Http\Controllers;

use App\Models\EventType;
use Illuminate\Http\Request;

class EventTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(EventType::all());
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
        $validated = $request->validate([
            'event_id' => 'required|exists:events,id',
            'type' => 'required|string|max:255',
            'price' => 'required|numeric',
            'max_attendees' => 'required|integer',
        ]);

        $eventType = EventType::create($validated);
        return response()->json($eventType, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(EventType $eventType)
    {
        return response()->json($eventType);
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
    public function update(Request $request, EventType $eventType)
    {
        $validated = $request->validate([
            'event_id' => 'sometimes|required|exists:events,id',
            'type' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'max_attendees' => 'sometimes|required|integer',
        ]);

        $eventType->update($validated);
        return response()->json($eventType);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EventType $eventType)
    {
        $eventType->delete();
        return response()->json(null, 204);
    }
}
