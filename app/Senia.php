<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class Senia extends Model
{
    protected $table = "senia";
    public $timestamps = false;

    public function tipo() {
    	return $this->hasOne('Hotel\TipoSenia', 'id', 'idTipoSenia');
    }

    public function reserva()
    {
        return $this->belongsTo('Hotel\Reserva', 'id', 'idSenia');
    }
}
