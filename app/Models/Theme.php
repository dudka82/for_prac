<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Http\Middleware\CheckPermission;

class Theme extends Model
{
    use HasFactory;

    protected $fillable = ['name','description']; 

 
    public function meetings(): HasMany
    {
        return $this->hasMany(Meeting::class);
    }
}
