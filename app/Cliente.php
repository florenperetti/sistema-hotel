<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = "cliente";
    protected $fillable = array('nombre','telefono','direccion','idProvincia','email');
}