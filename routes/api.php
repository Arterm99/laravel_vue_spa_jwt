<?php


use App\Http\Controllers\AuthController;
use App\Http\Controllers\Fruit\IndexController;
use App\Http\Controllers\User\StoreController;
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

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);

    // Роуты, которые требуют jwt-token
    Route::group(['middleware' => 'auth:api'], function () {
        Route::group(['namespace' => 'Fruit', 'prefix' => 'fruits'], function () {
            Route::get('/', [IndexController::class, '__invoke']);
        });
    });

});

Route::group(['namespace' => 'User', 'prefix' => 'users'], function () {
    Route::post('/', [StoreController::class, '__invoke']);
});
