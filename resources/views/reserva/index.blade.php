@extends('layouts.admin')

@section('contenido')
@include('alerts.exito')
@include('alerts.error')
@include('alerts.confirm')
@include('reserva.modal')
	<div id="reservas"></div>

	<table>
		<tbody>
			
		</tbody>
	</table>	
@stop

@section('scripts')
@endsection