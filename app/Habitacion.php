<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class Habitacion extends Model
{
    protected $table = "habitacion";
    protected $primaryKey = 'numeroHabitacion';
    public $timestamps = false;

    public function tipo() {
    	return $this->hasOne('Hotel\TipoHabitacion', 'numeroHabitacion', 'id');
    }

    public function reserva()
    {
        return $this->belongsTo('Hotel\Reserva', 'id', 'habitacionAsignada');
    }
}
