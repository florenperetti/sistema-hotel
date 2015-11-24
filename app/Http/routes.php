<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'FrontController@index');
Route::get('ayuda', 'FrontController@ayuda');
Route::get('admin', 'PanelReservasController@index');

Route::resource('cliente','ClienteController');
Route::get('clientes','ClienteController@listing');
Route::post('getCliente','ClienteController@getCliente');

Route::resource('reserva','ReservasController');

