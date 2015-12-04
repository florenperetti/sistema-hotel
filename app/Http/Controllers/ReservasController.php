<?php

namespace Hotel\Http\Controllers;

use Illuminate\Http\Request;

use Carbon;
use Illuminate\Validation\Validator;
use Hotel\Http\Requests;
use Hotel\Http\Requests\ReservaCreateRequest;
use Hotel\Http\Controllers\Controller;
use Hotel\EstadoReserva;
use Hotel\Reserva;
use Hotel\Cliente;
use Hotel\Habitacion;
use Hotel\TipoHabitacion;
use Hotel\Senia;
use DB;

class ReservasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reservas = Reserva::all();
        $estados = EstadoReserva::lists('estado', 'id');
        $clientes = Cliente::lists('nombre', 'id');
        $habitaciones = Habitacion::lists('numeroHabitacion', 'id');
        $tipo = TipoHabitacion::lists('tipoHabitacion', 'id');
        return view('reserva.index')->with('reservas', $reservas)->with('estados', $estados)->with('clientes', $clientes)->with('habitaciones', $habitaciones)->with('tipo', $tipo);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $estados = EstadoReserva::lists('estado', 'id');
        $clientes = Cliente::lists('nombre', 'id');
        $habitaciones = Habitacion::lists('numeroHabitacion', 'id');
        $tipo = TipoHabitacion::lists('tipoHabitacion', 'id');
        return view('reserva.create')->with('estados', $estados)->with('clientes', $clientes)->with('habitaciones', $habitaciones)->with('tipo',$tipo);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'fechaIngreso' => 'required',
            'fechaEgreso' => 'required|after:'.$request['fechaIngreso']
        ]);

        if($request->ajax()) {
            $reserva = Reserva::create($request->all());
            $cliente = Cliente::find($request->idCliente);
            $estado = EstadoReserva::find($request->idEstado);

            return response()->json([
                "apellido" => $cliente->apellido,
                "id" => $reserva->id,
                "estado" => $estado->estado
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $reserva = Reserva::with('cliente','cliente')
                                        ->with('habitacion','habitacion')
                                        ->with('habitacion.tipo','habitacion.tipo')
                                        ->with('estado','estado')
                                        ->with('senias', 'senias')
                                        ->with('senias.tipo', 'senias.tipo')->find($id);

        return json_encode([ "reserva" => $reserva]);
    }

    public function listing()
    {
        $datos = DB::table('reserva')
                        ->leftjoin('cliente', 'reserva.idCliente', '=', 'cliente.id')
                        ->leftjoin('estadoReserva', 'reserva.idEstado', '=', 'estadoReserva.id')
                        ->leftjoin('habitacion', 'reserva.idHabitacionAsignada', '=', 'habitacion.id')
                        ->leftjoin('tipoHabitacion', 'reserva.idTipoHabitacion', '=', 'tipoHabitacion.id')
                        ->select([  'reserva.id',
                                    'reserva.fechaIngreso',
                                    'reserva.fechaEgreso',
                                    'estadoReserva.estado',
                                    'habitacion.numeroHabitacion',
                                    'cliente.id as idCliente',
                                    'cliente.nombre',
                                    'cliente.apellido',
                                    'reserva.pax',
                                    'reserva.idTipoHabitacion',
                                    'tipoHabitacion.tipoHabitacion',
                                    'reserva.fechaReserva'
                                ])
                        ->get();
        return json_encode($datos);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $reserva = Reserva::with('cliente', 'cliente')->find($id);
        return json_encode($reserva);
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
        $reserva = Reserva::find($id);
        $reserva->fill($request->all());
        $reserva->save();
        return $request->all();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reserva = Reserva::find($id);
        $reserva->delete();
        return response()->json([
            "mensaje" => "eliminado"
        ]);
    }
}
