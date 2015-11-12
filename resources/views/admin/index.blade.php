@extends('layouts.admin')

@section('contenido')
	{!!Form::open()!!}
	<div id="msj-success" class="alert alert-success alert-dismissible" role="alert" style="display:none">
		<strong>Reserva Agregada Correctamente.</strong>
	</div>
	
	<h2>Reservas del mes de {{$fecha->nombreMes}}</h2>

	<div id="reservas">

		<div class="dias">
			<div class="dia"></div>

		@foreach($fecha->dias as $dia)
			<div class="dia">
				{{ $dia }}
			</div>
		@endforeach
		</div>
		<div class="habitaciones">
			@foreach($habitaciones as $habitacion)
				<div class="habitacion">
					<div class="num-hab">
						{{ $habitacion->numeroHabitacion }}
					</div>
					@foreach($fecha->dias as $dia)
						<div class="dia-hab" data-dia="{{$dia}}" data-mes="{{$fecha->mes}}" data-hab="{{$habitacion->numeroHabitacion}}">
							
						</div>
					@endforeach
				</div>
			@endforeach
		</div>
	</div>
	{!!Form::close()!!}
@endsection

@section('scripts')
	<script type="text/javascript">
		function darJson() {
			return <?php echo json_encode($reservas); ?>;
		}
	</script>
	{!!Html::script('js/reservas.js')!!}

@endsection