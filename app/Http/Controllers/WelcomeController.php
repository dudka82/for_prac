<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Meeting;
class WelcomeController extends Controller
{
    //
    public function index()
    {
        $meetings = Meeting::all();
        return response()->json($meetings);
        
    }
}
