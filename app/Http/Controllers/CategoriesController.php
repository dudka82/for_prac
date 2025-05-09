<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Theme;

class CategoriesController extends Controller
{
    //
    public function index()
    {
        $themes = Theme::all();
        return response()->json($themes);
    }
}
