<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class AddedMeeting extends Model
{
    protected $fillable = ['users_id', 'meetings_id'];
    
    public function meeting()
    {
        return $this->belongsTo(Meeting::class, 'meetings_id');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public $incrementing = false;
}