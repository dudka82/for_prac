<?php
namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\AddedMeeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function index()
    {
        return Event::all();
    }
    
    public function addMeeting(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id'
        ]);
        
        AddedMeeting::create([
            'user_id' => Auth::id(),
            'event_id' => $request->event_id
        ]);
        
        return response()->json(['success' => true]);
    }
}