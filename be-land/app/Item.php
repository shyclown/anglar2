<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class Item extends Model
{
    protected $table = "items";
   // protected $fillable = ['user_id'];

    public const FOLDER_ITEM = 1;
    public const ANOTHER_ITEM = 2;


    public function insert($item, $item_type)
    {
        $this->item_id = $item->id;
        $this->item_type = $item_type;
        return $this->save();
    }

    public function add_tag(Tag $tag)
    {
        $tag->items()->attach([ $this->id => [
            // extra data
        ]]);
    }

    public function remove_tag(Tag $tag)
    {
        $tag->items()->detach([ $this->id ]);
    }

    public function owner(){
        if (
            $this->item_type &&
            $this->item_type === self::FOLDER_ITEM
        ){
            return $this->hasOne('App\Folder', 'item_id', 'id');
        }
    }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

}
