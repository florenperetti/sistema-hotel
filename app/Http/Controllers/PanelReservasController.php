<?php

namespace Hotel\Http\Controllers;

use Illuminate\Http\Request;
use DB;

use Hotel\Http\Requests;
use Hotel\Http\Controllers\Controller;
use Hotel\Habitacion;
use Hotel\Reserva;
use Hotel\Fecha;

class PanelReservasController extends Controller
{
    /**
     * Muestra el panel de administracion.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $fecha = new Fecha(12);
        $habitaciones = Habitacion::all();
        $reservas = DB::table('reserva')->whereraw('MONTH(fechaIngreso) = ?', [12])->get();
        //$reservas = Reserva::all();
        return view('admin.index', compact(array('habitaciones', 'reservas', 'fecha')));
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
