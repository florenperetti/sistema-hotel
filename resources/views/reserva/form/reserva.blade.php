<div class="form-group">
	@include('alerts.exito')
	@include('alerts.error')

	{!!Form::label('fechaReserva', 'Fecha de reserva:')!!}
	{!!Form::text('fechaReserva', \Carbon\Carbon::today()->subDay()->format('d/m/Y'), $attributes = ['id'=>'fechaReserva', 'class'=>'form-control', 'placeholder'=>'Ingresa la fecha en la que se realizó la reserva.'])!!}

	{!!Form::label('fechaIngreso', 'Fecha de ingreso:')!!}
	{!!Form::text('fechaIngreso', \Carbon\Carbon::today()->subDay()->format('d/m/Y'), $attributes = ['id'=>'fechaIngreso', 'class'=>'form-control', 'placeholder'=>'Ingresa la fecha en la que ingresará el cliente.'])!!}

	{!!Form::label('fechaEgreso', 'Fecha de egreso:')!!}
	{!!Form::text('fechaEgreso', \Carbon\Carbon::today()->subDay()->format('d/m/Y'), $attributes = ['id'=>'fechaEgreso', 'class'=>'form-control', 'placeholder'=>'Ingresa la fecha de egreso del cliente.'])!!}
	
	{!!Form::label('idEstado', 'Estado de la reserva:')!!}
	{!!Form::select('idEstado', $estados, null, array('class' => 'form-control'))!!}

	{!!Form::label('pax', 'Cantidad de personas:')!!}
	{!!Form::number('pax', 2, $attributes = ['id'=>'pax', 'class'=>'form-control', 'placeholder'=>'Ingrese la cantidad de personas que se alojarán.', 'min'=>1, 'max'=>8])!!}

	{!!Form::label('idTipoHabitacion', 'Tipo de habitación:')!!}
	{!!Form::select('idTipoHabitacion', $tipo, null, array('class' => 'form-control'))!!}

	{!!Form::label('habitacionAsignada', 'Habitación:')!!}
	{!!Form::select('habitacionAsignada', $habitaciones, null, array('class' => 'form-control'))!!}
	
 	{!!Form::label('autoCliente', 'Cliente:')!!}
	{!!Form::text('autoCliente', '', $attributes = ['id'=>'autoCliente', 'class'=>'form-control', 'placeholder' => 'Ingrese el nombre del cliente.'])!!}
	{!!Form::hidden('idCliente', '', array('id'=>'idCliente'))!!}

	{!!Form::label('detalle', 'Detalles:')!!}
	{!!Form::textarea('detalle', null, $attributes = ['id'=>'detalle', 'class'=>'form-control', 'placeholder'=>'Ingrese detalles adicionales.', 'rows'=> 3])!!}
</div>