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

Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::get('logout', 'UserController@logout');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api', function (){
    return response()->json([]);
});

Route::get('/db_debug', function  (){
    return response()->json([]);
});

Route::get('/hash', function (){
    var_dump(Hash::make('password'));
});


/* Routes used for auth */
//Auth::routes();

Route::middleware('auth')->group(function () {});

Route::get('/home', 'HomeController@index')->name('home');
