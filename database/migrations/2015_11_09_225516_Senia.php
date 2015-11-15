<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Carbon\Carbon;

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
            $table->integer('idTipoSenia')->unsigned()->default(0);
            $table->foreign('idTipoSenia')->references('id')->on('tipoSenia');
            $table->datetime('fechaSenia')->default(\Carbon\Carbon::now());
            $table->decimal('monto',10,2)->default(0.00);
            $table->string('detalle',45)->nullable();
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
