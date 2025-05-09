<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Meeting extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'place',
        'date',
        'time',
        'description',
        'available_seats',
        'theme_id'
    ];

    public function theme()
    {
        return $this->belongsTo(Theme::class);
    }
    public function addedMeetings()
    {
        return $this->hasMany(AddedMeeting::class);
    }

    public function users()
{
    return $this->belongsToMany(User::class, 'added_meetings', 'meetings_id', 'users_id');
}
}