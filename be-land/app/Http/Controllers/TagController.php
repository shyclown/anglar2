<?php

namespace App\Http\Controllers;

use App\Item;
use App\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /* Tag is never updated */

    public function index(){
        return Tag::all();
    }

    public function store(Request $request){
        $tag = new Tag();
        $tag->name = $request->name;
        $tag->save();
    }
    public function update( Request $request, Tag $tag)
    {
        if (!$tag) {
            return response()->json([
                'error' => 'trying to update folder that does not exist'
            ]);
        }
        if( $tag->update([
            'name' => $request->name
        ])){
            return response()->json([
                'success'=> true,
                'tag'=> $tag
            ]);
        }
        return null;
    }

    public function destroy( Request $request, Tag $tag ){
        $tag->delete();
    }

    public function tagItem (Item $item, Tag $tag ){

    }

}