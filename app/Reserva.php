<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = "reserva";
    public $timestamps = false;

    public function cliente() {
    	return $this->hasMany('Hotel\Cliente', 'id', 'idCliente');
    }

    public function estado() {
    	return $this->hasOne('Hotel\EstadoReserva', 'id', 'idEstadoReserva');
    }

    public function habitacion() {
    	return $this->hasOne('Hotel\Habitacion', 'numeroHabitacion', 'habitacionAsignada');
    }

    public function senia() {
    	return $this->hasOne('Hotel\Senia', 'id', 'idSenia');
    }
}
