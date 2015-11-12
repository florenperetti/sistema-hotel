<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Reserva extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reserva', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('idEstado')->unsigned();
            $table->foreign('idEstado')->references('id')->on('estadoReserva');
            $table->integer('idCliente')->unsigned();
            $table->foreign('idCliente')->references('id')->on('cliente');
            $table->string('detalle', 200);
            $table->datetime('fechaReserva');
            $table->datetime('fechaIngreso');
            $table->datetime('fechaEgreso');
            $table->integer('habitacionAsignada')->unsigned();
            $table->foreign('habitacionAsignada')->references('numeroHabitacion')->on('habitacion');
            $table->integer('idSenia')->unsigned();
            $table->foreign('idSenia')->references('id')->on('senia');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('reserva');
    }
}
