<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class Habitacion extends Model
{
    protected $table = "habitacion";
    public $timestamps = false;

    public function tipo() {
    	return $this->hasOne('Hotel\TipoHabitacion', 'id', 'idTipoHabitacion');
    }

    public function reserva()
    {
        return $this->belongsTo('Hotel\Reserva', 'id', 'idHabitacionAsignada');
    }
}
