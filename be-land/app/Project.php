<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Facades\Auth;


class Project extends Model
{
    protected $fillable = ['name', 'description'];

    //protected $with = ['item'];

    public static function boot()
    {
        parent::boot();

        self::created(function(Project $project){
            $item = new Item;
            $item->entity_id = Auth::id();
            $project->item()->save($item); // Add new Item to Folder
        });
    }

    public function item(){
        return $this->morphOne(Item::class, 'entity');
    }
}
