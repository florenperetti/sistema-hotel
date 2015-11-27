<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = "reserva";
    protected $fillable = array('fechaIngreso','fechaEgreso','fechaReserva', 'detalle','idCliente','idEstado', 'idHabitacionAsignada', 'idSenia');
    public $timestamps = false;

    public function cliente() {
    	return $this->hasMany('Hotel\Cliente', 'id', 'idCliente');
    }

    public function estado() {
    	return $this->hasOne('Hotel\EstadoReserva', 'id', 'idEstadoReserva');
    }

    public function habitacion() {
    	return $this->hasOne('Hotel\Habitacion', 'id', 'idHabitacionAsignada');
    }

    public function senia() {
    	return $this->hasOne('Hotel\Senia', 'id', 'idSenia');
    }
}
