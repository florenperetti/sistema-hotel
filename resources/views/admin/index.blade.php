@extends('layouts.admin')

@section('contenido')
@include('reserva.modal', $estados)
	{!!Form::open()!!}
	<div id="msj-success" class="alert alert-success alert-dismissible" role="alert" style="display:none">
		<strong>Reserva Agregada Correctamente.</strong>
	</div>
	
	<h2 id="titulo"></h2>
	
	<input type="hidden" name="_token" value="{{ csrf_token() }}" id="token">

	<div id="reservas">

		<div class="dias">
			<div class="dia"></div>
		</div>
		<div class="habitaciones">
		</div>
	</div>
	{!!Form::close()!!}
@endsection

@section('scripts')
	<script type="text/javascript">
		function darJson() {
			return <?php echo json_encode( ["reservas"=>$reservas, "habitaciones"=>$todasHabitaciones]); ?>;
		}
	</script>
	{!!Html::script('js/reservas.js')!!}
@endsection