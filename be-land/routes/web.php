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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api', function (){

    return response()->json([]);
});


Route::post('/mock', function (){

    $rand = rand(0,100000);

    $new_folder = new \App\Folder;
    $new_folder->name = "newFolder_{$rand}";
    $new_folder->save();

    $folders = \App\Folder::all();

    return response()->json([
        'folders' => $folders
    ]);

});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
