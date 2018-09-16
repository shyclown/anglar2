<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $table = "tags";
    //
    protected $fillable = ["name"];

    public function items()
    {
        return $this->morphedByMany('App\Item', 'taggable');
    }

}
