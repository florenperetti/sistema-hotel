<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
	use SoftDeletes;
    protected $table = "cliente";
	protected $dates = ['deleted_at'];
    protected $fillable = array('nombre','telefono','direccion','idProvincia','email');
}