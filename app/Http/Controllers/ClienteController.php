<?php

namespace Hotel\Http\Controllers;

use Illuminate\Http\Request;

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
        return view('cliente.index')->with('provincias',$provincias);
    }

    public function listing()
    {
        $clientes = Cliente::all();
        return json_encode($clientes);
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

        //return response()->json(
         //   $this->cliente->toArray()
        //);
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
        
        if($request->ajax()) {
            $cliente = Cliente::find($id);
            $cliente->fill($request->all());

            $cliente->save();


            return response()->json(
                $request->all()
            );
        }
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
