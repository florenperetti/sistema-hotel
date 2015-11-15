<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class Provincia extends Model
{
    protected $table = "provincia";
    public $timestamps = false;

    public function cliente()
    {
        return $this->belongsTo('Hotel\Cliente', 'id', 'idProvincia');
    }
}
