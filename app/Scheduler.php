<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Scheduler extends Model
{
    use SoftDeletes;

    protected $casts = [
        'start' => 'date',
        'end' => 'date'
    ];
    protected $guarded = [];
    protected $table = 'schedulers';

}
