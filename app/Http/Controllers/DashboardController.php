<?php
namespace App\Http\Controllers;

use App\Models\Meeting;
use App\Models\User;
use Inertia\Inertia;
use App\Models\AddedMeeting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $bookedMeetings = $request->user()
            ->meetings()
            ->with('users') // если нужно загрузить связанные данные
            ->get();
    
        return Inertia::render('Dashboard', [
            'bookedMeetings' => $bookedMeetings,
        ]);
    }
}