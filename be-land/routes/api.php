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

Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');

Route::group(['middleware' => 'auth:api'], function(){
    Route::post('detail', 'UserController@details');
});

/* App public routes */
Route::get('/', function (Request $request) {
    return $request;
});


Route::get('/user', function() {
    return 'a';
})->middleware('auth:api');


Route::get('/folder', function (){

    $folders = \App\Folder::all();
    return response()->json([
        'folders'=> $folders
    ]);

});

Route::get('/convert/{nr}/{base}', function ($nr, $base){

    $result = null;
    $X = $nr;
    $Y = $base;
    $Z = [];
    $M = -1;
    $A = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        for ($i = $X; 0 < $i; $i = floor($i / $Y)) {
            if($i % $Y >= 10) {
                $Z[] = $A[$i % $Y - 10];
            } else {
                $Z[] = $i % $Y;
            }
            $M = $M + 1;
        }

        $result = '';
        for ($j = $M; $j >= 0; $j--) {
            $result = $result . strval( $Z[$j] );
        }




    return response()->json([
        'nr'=> $nr,
        'base'=> $base,
        'result'=> $result
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