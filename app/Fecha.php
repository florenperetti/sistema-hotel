<?php

namespace Hotel;

class Fecha
{
    public $dias = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ];
    public $mes = 1;
    public $nombreMes = "Enero";
    public $MESES = [ "1"=>"Enero", "2"=>"Febrero", "3"=>"Marzo", "4"=>"Abril", "5"=>"Mayo", "6"=>"Junio",
    						"7"=>"Julio", "8"=>"Agosto", "9"=>"Septiembre", "10"=>"Octubre", "11"=>"Noviembre", "12"=>"Diciembre" ];

    function __construct($mes) {
    	$this->mes = $mes;

    	if ($mes == 2) {
    		$this->dias = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28 ];
    	}
    	elseif ($mes == 1 || $mes == 3 || $mes == 5 || $mes == 7 || $mes == 8 || $mes == 10 || $mes == 12 ) {
    		$this->dias = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ];
    	}

        switch($mes) {
            case 1 : $this->nombreMes = "Enero"; break;
            case 2 : $this->nombreMes = "Febrero"; break;
            case 3 : $this->nombreMes = "Marzo"; break;
            case 4 : $this->nombreMes = "Abril"; break;
            case 5 : $this->nombreMes = "Mayo"; break;
            case 6 : $this->nombreMes = "Junio"; break;
            case 7 : $this->nombreMes = "Julio"; break;
            case 8 : $this->nombreMes = "Agosto"; break;
            case 9 : $this->nombreMes = "Septiembre"; break;
            case 10 : $this->nombreMes = "Octubre"; break;
            case 11 : $this->nombreMes = "Noviembre"; break;
            case 12 : $this->nombreMes = "Diciembre"; break;
        }
    }


}
