<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/* Item is most important Model that manages Ownership of Content */
class Item extends Model
{
    protected $table = "items";

    protected $with = ['tags'];

    public function insert($item, $item_type) {
        $this->item_id = $item->id;
        $this->item_type = $item_type;
        return $this->save();
    }

    public function add_tag(Tag $tag) {
        $tag->items()->attach([ $this->id => [
            // extra data
        ]]);
    }

    public function remove_tag(Tag $tag) {
        $tag->items()->detach([ $this->id ]);
    }

    /* Attaches Item model to another Item-able model */
    public function item(){ return $this->morphTo();  }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

}
