<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $table = "reserva";
    protected $fillable = array('fechaIngreso','fechaEgreso','fechaReserva', 'detalle','idCliente','idEstado', 'idHabitacionAsignada', 'idTipoHabitacion');
    public $timestamps = false;

    protected $dateFormat = 'Y-m-d';

    protected $dates = [
        'fechaIngreso',
        'fechaEgreso',
        'fechaReserva'
    ];

    public function cliente() {
    	return $this->hasOne('Hotel\Cliente', 'id', 'idCliente');
    }

    public function estado() {
    	return $this->hasOne('Hotel\EstadoReserva', 'id', 'idEstado');
    }

    public function habitacion() {
    	return $this->hasOne('Hotel\Habitacion', 'id', 'idHabitacionAsignada');
    }

    public function tipoHabitacion() {
        return $this->hasOne('Hotel\TipoHabitacion', 'id', 'idTipoHabitacion');
    }

    public function senias() {
    	return $this->hasMany('Hotel\Senia', 'idReserva', 'id');
    }
}
