<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
	use SoftDeletes;
    protected $table = "cliente";
	protected $dates = ['deleted_at'];
    protected $fillable = array('nombre','telefono','direccion', 'localidad','idProvincia','email');

    public function provincia() {
    	return $this->hasOne('Hotel\Provincia', 'id', 'idProvincia');
    }

    public function reserva()
    {
        return $this->belongsTo('Hotel\Reserva', 'id', 'idCliente');
    }
}