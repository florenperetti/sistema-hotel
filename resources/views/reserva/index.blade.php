@extends('layouts.admin')

@section('contenido')
@include('alerts.exito')
@include('alerts.error')
@include('alerts.confirm')
@include('reserva.modal')
	<table class="table">
		<thead>
			<th>Ingreso</th>
			<th>Egreso</th>
			<th>Noches</th>
			<th>Estado</th>
			<th>Cliente</th>
			<th>Pax</th>
			<th>Hab.</th>
			<th>Fecha Reserva</th>
			<th>Operaciones</th>
		</thead>
		<tbody id="datos">
		</tbody>
	</table>
@stop

@section('scripts')
	{!!Html::script('js/reservas.js')!!}
@endsection