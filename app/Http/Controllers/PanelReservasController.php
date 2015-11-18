<?php

namespace Hotel\Http\Controllers;

use Illuminate\Http\Request;
use DB;

use Hotel\Http\Requests;
use Hotel\Http\Controllers\Controller;
use Hotel\Habitacion;
use Hotel\Reserva;
use Hotel\Fecha;
use Hotel\EstadoReserva;
use Hotel\Cliente;

class PanelReservasController extends Controller
{
    /**
     * Muestra el panel de administracion.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $estados = EstadoReserva::lists('estado', 'id');
        $clientes = Cliente::lists('nombre', 'id');

        $fecha = new Fecha((\Carbon\Carbon::now()->month)+1);
        $todasHabitaciones = Habitacion::all();
        $habitaciones = Habitacion::lists('numeroHabitacion', 'id');
        $reservas = DB::table('reserva')->whereraw('MONTH(fechaIngreso) = ?', [11])->get();
        //$reservas = Reserva::all();
        return view('admin.index', compact(array('habitaciones', 'todasHabitaciones', 'reservas', 'estados', 'clientes')));
    }

    /**
     * Muestra el panel de administracion.
     *
     * @return \Illuminate\Http\Response
     */
    public function listing(Request $request)
    {
        if ($request->ajax()) {
            $habitaciones = Habitacion::all();
            return response()->json($habitaciones);
        }
        return view('admin.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
