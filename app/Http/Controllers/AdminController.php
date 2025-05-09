<?php
namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



// для ручного добавления роли admin для пользователя:

// php artisan tinker
// $user = \App\Models\User::find(1); // ID вашего пользователя
// $user->assignRole('admin');



class AdminController extends Controller
{
    // Управление темами
    
    public function getThemes()
    {
        $themes = Theme::all();
        return response()->json($themes);
    }

    public function createTheme(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $theme = Theme::create($request->all());
        return response()->json($theme, 201);
    }

    public function updateTheme(Request $request, $id)
    {
        $theme = Theme::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $theme->update($request->all());
        return response()->json($theme);
    }

    public function deleteTheme($id)
    {
        Theme::findOrFail($id)->delete();
        return response()->json(null, 204);
    }

    // Управление мероприятиями
    
    public function getMeetings()
    {
        $meetings = Meetings::orderBy('date')->orderBy('time')->get();
        return response()->json($meetings);
    }

    public function createMeeting(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'time' => 'required',
            'location' => 'required|string|max:255',
            'description' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $meeting = Meetings::create($request->all());
        return response()->json($meeting, 201);
    }

    public function updateMeeting(Request $request, $id)
    {
        $meeting = Meetings::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'date' => 'sometimes|date',
            'time' => 'sometimes',
            'location' => 'sometimes|string|max:255',
            'description' => 'sometimes|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $meeting->update($request->all());
        return response()->json($meeting);
    }

    public function deleteMeeting($id)
    {
        Meetings::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}