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

Route::group(['middleware' => 'auth:api'], function() {

    Route::resource('folder', 'FolderController')->except([ 'create', 'edit' ]);
    Route::resource('project', 'ProjectController')->except([ 'create', 'edit' ]);
    Route::resource('item', 'ItemController')->except([ 'create', 'edit' ]);
    Route::resource('tag', 'TagController')->except([ 'create', 'edit' ]);
/*
        Route::get('/folder', 'FolderController@getFolders');
        Route::get('/folder/{id}', 'FolderController@getFolder');
        Route::post('/folder', 'FolderController@createFolder');
        Route::put('/folder/{id}', 'FolderController@updateFolder');
*/
});
