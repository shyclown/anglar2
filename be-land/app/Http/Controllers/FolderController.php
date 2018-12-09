<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Folder;

class FolderController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }
    /* Show users folders */

    public function index(){
        return Folder::all();
    }

    public function show(Request $request, Folder $folder){
        //$folder = \App\Folder::where('id', $id)->get();

        return response()->json([
            'folder' => $folder
        ]);
    }

    public function update( Request $request, Folder $folder){
        //$folder = \App\Folder::where('id', $id);

        if(!$folder){
            return response()->json([
                'error' => 'trying to update folder that does not exist'
            ]);
        }


        if($request->parent_folder_id){
            $parent = Folder::where('id', $request->parent_folder_id)->exists();
            if(!$parent){
                return response()->json([
                    'error' => 'invalid parent id'
                ]);
            }
        }

        if(
        $folder->update([
            'parent_folder_id' => $request->parent_folder_id
        ])
        ){
            $folder = Folder::where('id', $request->id)->get();
            return response()->json([
                'success'=> true,
                'folder'=> $folder
            ]);
        }
        return null;
    }

    public function store( Request $request ){
        $folder = new Folder();
        $folder->name = $request->name;
        $folder->parent_folder_id = $request->parent_folder_id ?: null;
        /* custom insert function */
        $folder->insert();

        return response()->json([
            'success'=> true,
            'folder'=> Folder::where('id', $folder->id)->get()
        ]);
    }

    public function destroy( Request $request, Folder $folder ){
        $folder->delete();
    }

}