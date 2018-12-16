<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Folder extends Model
{
    protected $table = "folders";
    protected $with = ["item"];
    public $timestamps = false;

    public static function boot()
    {
        parent::boot();

        self::created(function(Folder $folder){
            $item = new Item;
            $item->user_id = Auth::id();
            $folder->item()->save($item); // Add new Item to Folder
        });
    }

    /* Folder has One User Item */
    public function item(){
        return $this->morphOne(Item::class, 'item');
    }

    /* Folder can have many Tags through Item*/
    public function tags(){
        return $this->item()->tags();
    }


}

