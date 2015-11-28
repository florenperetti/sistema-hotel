@extends('layouts.admin')

@section('contenido')
@include('alerts.exito')
@include('alerts.error')
@include('alerts.confirm')
	<table class="table">
		<thead>
			<th>Nombre</th>
			<th>Apellido</th>
			<th>Teléfono</th>
			<th>Dirección</th>
			<th>Localidad</th>
			<th>Provincia</th>
			<th>Email</th>
			<th>Operaciones</th>
		</thead>
		<tbody id="datos">
		</tbody>
		<input type="hidden" name="_token" value="{{ csrf_token() }}" id="token">
	</table>
@endsection

@section('scripts')
    <script src="/js/clientes-papelera.js" type="application/javascript"></script>
@endsection