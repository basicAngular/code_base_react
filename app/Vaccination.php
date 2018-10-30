<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vaccination extends Model
{
    use SoftDeletes;
    protected $guarded = [];

    public function users()
    {
        return $this->belongsToMany('App\User', 'vaccination_status');
    }
}
