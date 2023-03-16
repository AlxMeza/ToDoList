<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/get/task/{id}', 'App\Http\Controllers\TaskController@getTask');
Route::get('/get/asignedtask/{id}', 'App\Http\Controllers\TaskController@getTaskAsigned');
Route::get('/get/roltask/{rol}', 'App\Http\Controllers\TaskController@getTaskByRol');

Route::post('/post/task', 'App\Http\Controllers\TaskController@postTask');
Route::post('/put/task', 'App\Http\Controllers\TaskController@putTask');
Route::get('/get/user/{rol}', 'App\Http\Controllers\TaskController@getUserByRol');
Route::get('/get/shareuser/{id}', 'App\Http\Controllers\TaskController@shareUser');

Route::post('/post/user', 'App\Http\Controllers\TaskController@postUser');

Route::get('/get/counttask/{id}/{rol}', 'App\Http\Controllers\TaskController@getTaskCount');

/*Current Task*/
Route::post('/post/currenttask', 'App\Http\Controllers\TaskController@postCurrentTask');

Route::get('/test/user', 'App\Http\Controllers\TaskController@testUser');