<?php
namespace App\Http\Controllers;

use App\Models\AddedMeeting;
use App\Models\Meeting;
use App\Models\User;
use Illuminate\Http\Request;

class AddedMeetingsController extends Controller
{
    public function index()
    {
        return response()->json([
            'addedMeetings' => AddedMeeting::select('id', 'users_id', 'meetings_id')->get()
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'users_id' => 'required|integer|exists:users,id',
            'meetings_id' => 'required|integer|exists:meetings,id',
        ]);

        $addedMeeting = AddedMeeting::create($validated);

        return response()->json($addedMeeting, 201);
    }
}