<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Folder extends Model
{
    protected $table = "folders";
    protected $with = ["item"];
    public $timestamps = false;
    //

    public function insert(){

        if(DB::transaction( function(){
            $this->save(); // Save Folder
            $item = new Item;
            $item->insert($this, Item::FOLDER_ITEM); // Save Item
        })){

            return $this;
        };

    }

    public function item(){
        return $this
            ->hasMany('App\Item', 'item_id','id')
            ->where('item_type', Item::FOLDER_ITEM );
    }

    public function tags(){
        return $this->item()->tags();
    }


}

