<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Meeting;
use App\Models\Theme;

class SearchController extends Controller
{
    //
    public function index()
    {
        $meetings = Meeting::all();
        $themes = Theme::all();
        return response()->json($themes);
            
    }
}