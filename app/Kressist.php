<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kressist extends User
{
    protected static $singleTableType = 'kressist';

    public function krempler()
    {
        return $this->belongsTo('App\User', 'krempler_id');
    }
}
