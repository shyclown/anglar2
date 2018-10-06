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


Auth::routes();

Route::middleware('auth')->get('/folder', function (){

    $folders = \App\Folder::all();
    return response()->json([
        'folders'=> $folders
    ]);

});

Route::get('/home', 'HomeController@index')->name('home');
