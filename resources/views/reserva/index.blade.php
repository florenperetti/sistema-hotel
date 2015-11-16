@extends('layouts.admin')

@section('contenido')
@include('alerts.exito')
@include('alerts.error')
@include('alerts.confirm')
@include('reserva.modal', $datos)
	<div id="reservas"></div>

	<table>
		<tbody>
			
		</tbody>
	</table>	
@stop

@section('scripts')
	{!!Html::script('js/reservas.js')!!}
@endsection