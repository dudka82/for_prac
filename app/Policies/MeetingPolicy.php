<?php
namespace App\Policies;

use App\Models\User;
use App\Models\Meeting;
use Illuminate\Auth\Access\HandlesAuthorization;

class MeetingPolicy
{
    public function create(User $user)
    {
        return $user->hasPermissionTo('create themes');
    }

    public function update(User $user, Meeting $meeting)
    {
        return $user->hasPermissionTo('update themes');
    }

    public function delete(User $user, Meeting $meeting)
    {
        return $user->hasPermissionTo('delete themes');
    }
    public function viewAny(User $user)
    {
        return $user->role === 'admin';
    }
}