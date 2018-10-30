<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Service extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    protected $casts = [
        'contract_start' => 'date',
        'cancellation_date' => 'date'
    ];

    public function document()
    {
        return $this->belongsTo('App\Document', 'contract_document');
    }

}
