<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/* Item is most important Model that manages Ownership of Content */
class Item extends Model
{
    protected $table = "items";

    public function insert($entity, $entity_type) {
        $this->entity_id = $entity->id;
        $this->entity_type = $entity_type;
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
    public function entity(){ return $this->morphTo();  }

    public function tags()
    {
        return $this->morphToMany('App\Tag', 'taggable');
    }

}
