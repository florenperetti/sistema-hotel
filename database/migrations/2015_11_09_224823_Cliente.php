<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Cliente extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cliente', function(Blueprint $table){
            $table->increments('id');
            $table->string('nombre', 45);
            $table->string('telefono', 20);
            $table->string('direccion', 45);
            $table->string('localidad', 45);
            $table->integer('idProvincia')->unsigned();
            $table->foreign('idProvincia')->references('id')->on('provincia');
            $table->string('email', 45);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('cliente');
    }
}
