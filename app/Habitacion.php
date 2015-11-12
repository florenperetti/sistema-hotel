<?php

namespace Hotel;

use Illuminate\Database\Eloquent\Model;

class Habitacion extends Model
{
    protected $table = "habitacion";
    protected $primaryKey = 'numeroHabitacion';
}
