<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Files extends Model
{

    protected $fillable = [
        'path'
    ];
    

    public function posts()
{
    return $this->belongsToMany(User::class)->withPivot('role');
}
}
