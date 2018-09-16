<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/folder', function (){

    $folders = \App\Folder::all();
    return response()->json([
        'folders'=> $folders
    ]);

});


Route::get('/folder/{id}', function ($id){
    $folder = \App\Folder::where('id', $id)->get();

    return response()->json([
        'folder'=> $folder
    ]);

});

Route::post('/folder/create', function ( Request $request){
    $folder = new \App\Folder();
    $folder->name = $request->name;
    $folder->parent_folder_id = $request->parent_folder_id ?: null;

    $folder->insert();

    return response()->json([
        'success'=> true,
        'folder'=> App\Folder::where('id', $folder->id)->get()
    ]);

});

Route::post('/folder/update', function ( Request $request){

    /* Updated */
    $folder = \App\Folder::where('id', $request->id);

    if(!$folder){
        return response()->json([
            'error' => 'trying to update folder that does not exist'
        ]);
    }


    if($request->parent_folder_id){
        $parent = \App\Folder::where('id', $request->parent_folder_id)->exists();
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
        $folder = \App\Folder::where('id', $request->id)->get();
        return response()->json([
            'success'=> true,
            'folder'=> $folder
        ]);
    }



});