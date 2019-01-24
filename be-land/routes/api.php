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

Route::post('/file/upload', 'FileController@upload')
    ->middleware('auth:api');

Route::group(['middleware' => 'auth:api'], function() {

    Route::resource('folder', 'FolderController')->except([ 'create', 'edit' ]);
    Route::resource('project', 'ProjectController')->except([ 'create', 'edit' ]);
    Route::resource('item', 'ItemController')->except([ 'create', 'edit' ]);
    Route::resource('tag', 'TagController')->except([ 'create', 'edit' ]);

});
