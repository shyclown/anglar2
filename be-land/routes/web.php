<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api', function (){
    return response()->json([]);
});

Route::get('/db_debug', function  (){
    return response()->json([]);
});

Route::post('/save_folder', function (Request $request){

    $post = $request->post();

    if($name = $post['name']?: 'Unknown'){
        $newFolder = new \App\Folder;
        $newFolder->name = $name;
        $newFolder->save();
    }

    return response()->json([
        $post
    ]);

});


Route::post('/mock', function (){

    $folders = \App\Folder::all();

    return response()->json([
        'folders'=> $folders
    ]);

});

/* Routes used for auth */
Auth::routes();

Route::middleware('auth')->group(function () {

    /* Create new folder */
    Route::post('/folder', function (Request $request){
        return response($request);
        $newFolder = new \App\Folder;
        $newFolder->name = $request->post()['name'] ?: 'New Folder';
        return $newFolder->save();
    });
    /* Test */
    Route::get('/folder/new/{name}', function (Request $request, $name){
    var_dump($name);
        $newFolder = new \App\Folder;
        $newFolder->name = $name;
        $newFolder->insert();
        var_dump($newFolder);die();
    });

    /* All Folders */
    Route::get('/folder', function (){
        return \App\Folder::all();
    });

    /* Single Folder */
    Route::get('/folder/{id}', function ($id){
        return \App\Folder::where('id' , $id)->get();
    });


    /* Update folder */
    Route::put('/folder/{id}', function (Request $request, $id){
        $updatedFolder = \App\Folder::find($id);
        $updatedFolder->name = $request->post()['name'];
        return $updatedFolder->save();
    });

});

Route::get('/home', 'HomeController@index')->name('home');
