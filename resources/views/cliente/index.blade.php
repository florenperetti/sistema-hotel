@extends('layouts.admin')

@section('contenido')
@include('alerts.exito')
@include('alerts.error')
@include('alerts.confirm')
@include('cliente.modal', $provincias)
	<table class="table">
		<thead>
			<th>Nombre</th>
			<th>Teléfono</th>
			<th>Dirección</th>
			<th>Localidad</th>
			<th>Provincia</th>
			<th>Email</th>
			<th>Operaciones</th>
		</thead>
		<tbody id="datos">
		</tbody>
	</table>
@endsection

@section('scripts')
	{!!Html::script('js/clientes.js')!!}
@endsection