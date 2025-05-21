<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\TicketController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::apiResource('categories',CategoryController::class);
    Route::apiResource('tickets',TicketController::class);
});
