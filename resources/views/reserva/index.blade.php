@extends('layouts.admin')

@section('contenido')
	<div id="reservas"></div>

	<table>
		<tbody>
			@foreach($reservas as $reserva)
			<tr>
				<td>$reserva->id</td>
			</tr>
			@enforeach
		</tbody>
	</table>	
@stop