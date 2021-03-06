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
            $table->integer('idEstado')->unsigned()->default(0);
            $table->foreign('idEstado')->references('id')->on('estadoReserva');
            $table->integer('idCliente')->unsigned();
            $table->foreign('idCliente')->references('id')->on('cliente');
            $table->integer('pax')->nullable()->default(2);
            $table->integer('idTipoHabitacion')->unsigned()->nullable();
            $table->foreign('idTipoHabitacion')->references('id')->on('tipoHabitacion');
            $table->string('detalle', 200)->nullable();
            $table->date('fechaReserva');
            $table->date('fechaIngreso');
            $table->date('fechaEgreso');
            $table->integer('idHabitacionAsignada')->unsigned()->nullable();
            $table->foreign('idHabitacionAsignada')->references('id')->on('habitacion');
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
