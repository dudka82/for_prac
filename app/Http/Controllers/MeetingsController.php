<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AddedMeeting;
use App\Models\User;
use App\Models\Theme;
use App\Models\Meeting;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
class MeetingsController extends Controller

{


    public function index()
    {
        $meetings = Meeting::with('theme')->latest()->paginate(10);
        return Inertia::render('Meetings/Index', [
            'meetings' => Meeting::with('theme')->get()->toArray(), 
            'themes' => Theme::all()->toArray(),
            'auth' => [
                'user' => auth()->user() ? [
                    'id' => auth()->id(),
                    'name' => auth()->user()->name,
                    'email' => auth()->user()->email,
                    'role' => auth()->user()->role
                ] : null
            ]
        ]);
    }

    /**
     * Показать форму создания новой встречи
     */
    public function create()
    {
     
        return Inertia::render('Meetings/Create', [
            'themes' => Theme::all(),
        ]);
    }

    /**
     * Сохранить новую встречу в БД
     */
    public function store(Request $request)
{
    $validated = $request->validate([
       

        'name' => 'required|string|max:255',
        'place' => 'required|string|max:255',
        'date' => 'required|date',
        'time' => 'required',
        'description' => 'required|string',
        'available_seats' => 'required|integer|min:1',
        'theme_id' => 'required|exists:themes,id'
    ]);

    $meeting = Meeting::create($validated);

    return redirect()->route('meetings.index')
        ->with('success', 'Мероприятие успешно создано');
}

    /**
     * Показать конкретную встречу
     */
    public function show(Meeting $meeting)
    {
        return view('meetings.show', compact('meeting'));
    }

    /**
     * Показать форму редактирования встречи
     */
    public function edit(Meeting $meeting)
    {
        $themes = Theme::all();
      

        return inertia('Meetings/Edit', [
            'meetings' => $meeting,
            'themes' => Theme::all(),
        ]);
    }

    /**
     * Обновить встречу в БД
     */
    public function update(Request $request, Meeting $meeting)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'place' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'required',
            'description' => 'required|string',
            'available_seats' => 'required|integer|min:1',
             'theme_id' => 'required|exists:themes,id',
        ]);

        $meeting->update($validated);

        return redirect()->route('meetings.index')
            ->with('success', 'Мероприятие успешно обновлено');
    }

    public function destroy(Meeting $meeting)
    {
        $meeting->delete();
        return redirect()->route('meetings.index')
            ->with('success', 'Мероприятие удалено');
    }   
    public function book(Request $request)
    {
        $request->validate([
            'meetings_id' => 'required|integer|exists:meetings,id',
        ]);

        if (!Auth::check()) {
            return back()->with('error', 'Необходима авторизация');
        }

        $meetingId = $request->input('meetings_id');
        $userId = Auth::id();
        $meeting = Meeting::findOrFail($meetingId);

        if (AddedMeeting::where(['meetings_id' => $meetingId, 'users_id' => $userId])->exists()) {
            return back()->with('error', 'Вы уже зарегистрированы на эту встречу');
        }

        if ($meeting->available_seats <= 0) {
            return back()->with('error', 'Нет свободных мест');
        }

        AddedMeeting::create([
            'users_id' => $userId,
            'meetings_id' => $meetingId
        ]);

        $meeting->decrement('available_seats');

        return back()->with('success', 'Регистрация на встречу прошла успешно');
    }

    public function cancel(Request $request)
    {
        $request->validate([
            'meetings_id' => 'required|integer|exists:meetings,id',
        ]);

        if (!Auth::check()) {
            return back()->with('error', 'Необходима авторизация');
        }

        $meetingId = $request->input('meetings_id');
        $userId = Auth::id();

        $registration = AddedMeeting::where([
            'meetings_id' => $meetingId,
            'users_id' => $userId
        ])->first();

        if (!$registration) {
            return back()->with('error', 'Регистрация не найдена');
        }

        $meeting = Meeting::findOrFail($meetingId);
        $registration->delete();
        $meeting->increment('available_seats');

        return back()->with('success', 'Регистрация успешно отменена');
        
    }


    public function cancelBooking(Request $request)
{
    $request->validate([
        'meeting_id' => 'required|exists:meetings,id'
    ]);

    $removed = $request->user()
        ->meetings()
        ->detach($request->meeting_id);

    if ($removed) {
        return redirect()->back()->with('success', 'Бронирование отменено');
    }

    return redirect()->back()->with('error', 'Не удалось отменить бронирование');
}

}
