<?php

namespace App\Http\Controllers;

use App\Project;
use App\Tag;
use Illuminate\Http\Request;
use App\Folder;

class ProjectController extends Controller
{
    public function index(){
        return Project::all();
    }

    public function show(Project $project){
        return $project;
    }

    public function update( Request $request, Project $project)
    {
        if(!$project){ return response()->json([
            'error' => 'trying to update folder that does not exist'
        ]);}

        if( $project->update([
            'name' => $request->name,
            'description' => $request->description
        ])){
           // $project = Project::where('id', $request->id )->get();
            return response()->json([
                'success'=> true,
                'project'=> $project
            ]);
        }
        return null;
    }

    public function store( Request $request )
    {

        $tagsToSync = [];

        foreach( $request->get('tags') as $tag) {
            if(!isset($tag["id"])){ $tag = Tag::create($tag); }
            array_push($tagsToSync, $tag["id"]);
        }

        $project = Project::create( $request->all() );

        $project->item->tags()->sync($tagsToSync);


        return response()->json([
            'tags'=>$tagsToSync,
            'project'=> Project::where('id', $project->id)->get()
        ]);
    }

    public function destroy( Project $project )
    {
        $project->delete();
    }
}