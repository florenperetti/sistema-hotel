<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Senia extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('senia', function(Blueprint $table){
            $table->increments('id');
            $table->integer('idTipoSenia')->unsigned();
            $table->foreign('idTipoSenia')->references('id')->on('tipoSenia');
            $table->datetime('fechaSenia');
            $table->decimal('monto',10,2);
            $table->string('detalle',45);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('senia');
    }
}
