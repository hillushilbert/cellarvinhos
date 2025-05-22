<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\TicketController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Auth::routes();

Route::get('/', function () {
    return view('auth.login');
});



Route::group(['middleware' => ['auth']], function () {
    Route::get('/home', [HomeController::class,'index']);
    Route::resource('tickets',TicketController::class);
});