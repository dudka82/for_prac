<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use app\Http\Controllers\UserController;
use App\Models\User;
class CheckPermission
{
    public function handle(Request $request, Closure $next, $permission)
    {
        if (!auth()->user()->can($permission)) {
            abort(403, 'Доступ запрещен');
        }

        return $next($request);
    }
}   