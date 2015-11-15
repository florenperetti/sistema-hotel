<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class TipoHabitacion extends Model
{
    protected $table = "tipoHabitacion";
    public $timestamps = false;

    public function habitacion()
    {
        return $this->belongsTo('Hotel\Habitacion', 'id', 'idTipoHabitacion');
    }
}
