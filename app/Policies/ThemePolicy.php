<?php
namespace App\Policies;

use App\Models\User;
use App\Models\Theme;
use Illuminate\Auth\Access\HandlesAuthorization;

class ThemePolicy
{
    public function create(User $user)
    {
        return $user->hasPermissionTo('create themes');
    }

    public function update(User $user, Theme $theme)
    {
        return $user->hasPermissionTo('update themes');
    }

    public function delete(User $user, Theme $theme)
    {
        return $user->hasPermissionTo('delete themes');
    }
    public function viewAny(User $user)
{
    return $user->role === 'admin';
}
}