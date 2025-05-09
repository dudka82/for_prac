<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Middleware\CheckPermission;

class ThemesController extends Controller
{
    public function index()
    {
        return Inertia::render('Themes/Index', [
            'themes' => Theme::all(),
            'can' => [
                'create' => auth()->user() ? auth()->user()->can('create themes') : false,
            ],
        ]);
    } 

    public function create()
{
    if (auth()->user()->role !== 'admin') {
        abort(403);
    }
    
    return Inertia::render('Themes/Create');
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:themes',
            'description' => 'required|string',
        ]);

        Theme::create($validated);

        return redirect()->route('themes.index')
            ->with('success', 'Тема успешно создана');
    }

    public function show(Theme $theme)
    {
        return Inertia::render('Themes/Show', [
            'theme' => $theme,
            'can' => [
                'edit' => auth()->user()?->role === 'admin',
            ],
        ]);
    }

    public function edit(Theme $theme)
    {
        return Inertia::render('Themes/Edit', [
            'theme' => $theme,
        ]);
    }

    public function update(Request $request, Theme $theme)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:themes,name,'.$theme->id,
            'description' => 'required|string',
        ]);

        $theme->update($validated);

        return redirect()->route('themes.index')
            ->with('success', 'Тема успешно обновлена');
    }

    public function destroy(Theme $theme)
    {
        $theme->delete();

        return redirect()->route('themes.index')
            ->with('success', 'Тема успешно удалена');
    }
}