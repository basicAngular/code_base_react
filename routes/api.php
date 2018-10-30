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
//Route::get('/')
Route::get('/home', function () {
        return 'hello';
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function() {
    Route::resource('kremplers', 'KremplerController');
    Route::resource('customers', 'CustomerController');
    Route::resource('kressists', 'KressistController');
    Route::resource('documents', 'DocumentController');
    Route::post('documents/upload', 'DocumentController@upload');
    Route::resource('folders', 'FolderController');
    Route::resource('vaccinations', 'VaccinationController');
    Route::resource('vaccination_status', 'VaccinationStatusController');
    Route::resource('shop', 'ShopItemController');
    Route::resource('services', 'ServiceController');
    Route::resource('scheduler', 'SchedulerController');
    Route::resource('articles', 'ArticlesController');

    Route::get('profile', 'ProfileController@show');

    Route::get('getDocument', 'DocumentController@getDocument');

    Route::put('profile', 'ProfileController@update');
    Route::patch('profile', 'ProfileController@update');
    Route::put('profile/change-password', 'ProfileController@changePassword');
    Route::patch('profile/change-password', 'ProfileController@changePassword');
});

/*Route::group([
    'prefix' => 'auth'
], 
function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');
  
    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});
*/