<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Customer extends User
{
    protected static $singleTableType = 'customer';

    public function krempler()
    {
        return $this->belongsTo('App\User', 'krempler_id');
    }

    public function documents()
    {
        return $this->hasMany('App\Document', 'customer_id');
    }

    public function folders()
    {
        return $this->hasMany('App\Folder', 'customer_id');
    }

    public function vaccinations()
    {
        return $this->belongsToMany('App\Vaccination', 'vaccination_status', 'user_id');
    }
}
