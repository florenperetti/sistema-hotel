<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class TipoSenia extends Model
{
    protected $table = "tipoSenia";
    public $timestamps = false;

    public function senia()
    {
        return $this->belongsTo('Hotel\Senia', 'id', 'idTipoSenia');
    }
}
