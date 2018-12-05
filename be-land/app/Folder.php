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

    public function insert() {
        if(DB::transaction( function(){
            $this->save(); // Save Folder
            $item = new Item;
            $item->user_id = Auth::id();
            $this->item()->save($item); // Add new Item to Folder
        })){
            return $this;
        };
        // Failed to save the Folder or add folder to the Item Model
        return null;
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

