<?php

namespace App\Http\Controllers;

use App\Item;
use App\Project;
use App\Tag;
use Illuminate\Http\Request;
use App\Folder;

class ProjectController extends Controller
{
    public function index(){
        return Project::with('item.tags')->get();
    }

    public function show(Project $project){
        return $project->load('item.tags');
    }

    private function updateProjectTags($tags , Project $project){

        $newTags = [];
        foreach ($tags as $tag){
            if(isset($tag['id'])){ $newTags[]=$tag['id']; }
            else{
                $existingTag = Tag::where('name',$tag['name'])->first();
                if($existingTag){
                    $newTags[]=$existingTag->id;
                }
                else {
                    $newTag = new Tag();
                    $newTag->fill($tag);
                    $newTag->save();
                    $newTags[] = $newTag->id;
                }
            }
        }

        $project->item->tags()->sync($newTags);
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
            $request->tags && $this->updateProjectTags($request->tags, $project);
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

        $request->tags && $this->updateProjectTags($request->tags, $project);

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