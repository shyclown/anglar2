<?php

namespace App\Http\Controllers;

use App\Project;
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
        $project = new Project();
        $project->name = $request->name;
        $project->description = $request->description;
        /* custom insert function */
        $project->save();

        return response()->json([
            'success'=> true,
            'folder'=> Project::where('id', $project->id)->get()
        ]);
    }

    public function destroy( Project $project )
    {
        $project->delete();
    }
}