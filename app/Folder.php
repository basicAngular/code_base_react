<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{

    public function customer()
    {
        return $this->belongsTo('App\Customer', 'customer_id');
    }

    public function documents()
    {
        return $this->hasMany('App\Document');
    }

    public function parents()
    {
        return $this->belongsTo('App\Folder', "parent_id");
    }

    public function childs()
    {
        return $this->hasMany('App\Folder', "parent_id");
    }

}
