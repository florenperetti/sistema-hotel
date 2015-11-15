<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class EstadoReserva extends Model
{
    protected $table = "estadoReserva";
    public $timestamps = false;

    public function reserva()
    {
        return $this->belongsTo('Hotel\Reserva', 'id', 'idEstado');
    }
}
