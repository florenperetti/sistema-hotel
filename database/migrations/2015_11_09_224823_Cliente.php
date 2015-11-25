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
            $table->string('nombre', 45)->default('Desconocido')->nullable();
            $table->string('apellido', 45)->default('Desconocido');
            $table->string('telefono', 20)->nullable();
            $table->string('direccion', 45)->nullable();
            $table->string('localidad', 45)->nullable();
            $table->integer('idProvincia')->unsigned()->default(24);
            $table->foreign('idProvincia')->references('id')->on('provincia');
            $table->string('email', 45);
            $table->timestamps();
            $table->datetime('deleted_at')->nullable();
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
