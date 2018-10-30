	<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Articles extends Model
{
    use SoftDeletes;

    protected $guarded = [];
    protected $table = 'articles';

    protected $casts = [
        'creation_date' => 'date'
    ];

}
