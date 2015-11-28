<?php

namespace Hotel\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Hotel\Http\Requests;
use Hotel\Http\Requests\ClienteCreateRequest;
use Hotel\Http\Controllers\Controller;
use Hotel\Cliente;
use Hotel\Provincia;
use DB;

class ClienteController extends Controller
{
/*
    public function __construct() {
        $this->beforeFilter('@find',['only'=> ['edit','update','destroy']]);
    }

    public function find(Route $route) {
        $this->cliente = Cliente::find($route->getParameter('cliente'));
    }*/


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $provincias = DB::table('provincia')->lists('nombre', 'id');
        return view('cliente.index', compact('provincias'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function papelera()
    {
        $provincias = DB::table('provincia')->lists('nombre', 'id');
        return view('cliente.papelera', compact('provincias'));
    }

    public function listing()
    {
        $datos = DB::table('cliente')
                        ->join('provincia', 'cliente.idProvincia', '=', 'provincia.id')
                        ->select([  'cliente.nombre as nombre',
                                    'cliente.apellido',
                                    'cliente.id',
                                    'cliente.telefono',
                                    'cliente.direccion',
                                    'cliente.localidad',
                                    'cliente.email',
                                    'provincia.nombre as provincia',
                                    'provincia.id as idProvincia'
                                ])
                        ->whereNull('deleted_at')
                        ->get();
        return json_encode($datos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $provincias = Provincia::lists('nombre', 'id');
        return view('cliente.create', compact('provincias'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ClienteCreateRequest $request)
    {
        if($request->ajax()) {
            Cliente::create($request->all());
            return response()->json([
                "mensaje" => "creado"
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
        $cliente = Cliente::find($id);
        return json_encode($cliente);
    }

    /**
     * Trae los clientes para el autocomplete.
     *
     * @param  Request  $request
     * @return Array
     */
    public function getCliente(Request $request)
    {
        $cliente = $request->term;
        $clientes = Cliente::all();
        $result = [];

        foreach ($clientes as $key => $cli) {
            if(strpos(Str::lower($cli['nombre']), $cliente) !== false || strpos(Str::lower($cli['apellido']), $cliente) !== false ){
                $nombreCompleto = $cli['nombre']." ".$cli['apellido'];
                $result[] = [ "value" => $nombreCompleto, "label" => $nombreCompleto, "id" => $cli['id'] ];
            }
        }
        
        return json_encode($result);
    }

    /**
     * Trae los clientes eliminados para la papelera.
     *
     * @param  Request  $request
     * @return Array
     */
    public function getClientesEliminados(Request $request)
    {
        $clientes = DB::table('cliente')
                        ->join('provincia', 'cliente.idProvincia', '=', 'provincia.id')
                        ->select([  'cliente.nombre as nombre',
                                    'cliente.apellido',
                                    'cliente.id',
                                    'cliente.telefono',
                                    'cliente.direccion',
                                    'cliente.localidad',
                                    'cliente.email',
                                    'provincia.nombre as provincia',
                                    'provincia.id as idProvincia'
                                ])
                        ->whereraw('cliente.deleted_at IS NOT NULL')
                        ->get();

        $test = Cliente::whereraw('deleted_at IS NOT NULL')->get();

        return json_encode($clientes);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ClienteCreateRequest $request, $id)
    {
        $cliente = Cliente::find($id);
        $cliente->fill($request->all());
        $cliente->save();
        return $request->all();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restaurar($id)
    {
        $cliente = Cliente::withTrashed()->find($id)->restore();
        return response()->json([
            "mensaje" => $cliente
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cliente = Cliente::find($id);
        $cliente->delete();
        return response()->json([
            "mensaje" => "eliminado"
        ]);
    }
}