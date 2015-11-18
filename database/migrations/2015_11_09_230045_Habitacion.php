<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Habitacion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('habitacion', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('numeroHabitacion');
            $table->integer('idTipoHabitacion')->unsigned();
            $table->foreign('idTipoHabitacion')->references('id')->on('tipoHabitacion');
            $table->integer('capacidad')->default(2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('habitacion');
    }
}
