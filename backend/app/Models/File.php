<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{

    protected $fillable = [
        'path'
    ];
    

    public function users()
{
    return $this->belongsToMany(User::class)->withPivot('role');
}
}
