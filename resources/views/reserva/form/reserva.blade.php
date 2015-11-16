<div class="form-group">
	@include('alerts.exito')
	@include('alerts.error')

	{!!Form::label('fechaReserva', 'Fecha de reserva: ')!!}
	{!!Form::date('fechaReserva', \Carbon\Carbon::now(), $attributes = ['id'=>'fechaReserva', 'class'=>'form-control', 'placeholder'=>'Ingresa la fecha en la que se realizó la reserva.'])!!}

	{!!Form::label('fechaIngreso', 'Fecha de ingreso: ')!!}
	{!!Form::date('fechaIngreso', \Carbon\Carbon::now(), $attributes = ['id'=>'fechaIngreso', 'class'=>'form-control', 'placeholder'=>'Ingresa la fecha en la que ingresará el cliente.'])!!}

	{!!Form::label('fechaEgreso', 'Fecha de egreso: ')!!}
	{!!Form::date('fechaEgreso', \Carbon\Carbon::now(), $attributes = ['id'=>'fechaEgreso', 'class'=>'form-control', 'placeholder'=>'Ingresa la fecha de egreso del cliente.'])!!}
	
	{!!Form::label('idEstado', 'Estado de la reserva: ')!!}
	{!!Form::select('idEstado', $estados, null, array('class' => 'form-control'))!!}
	
	{!!Form::label('habitacionAsignada', 'Habitación: ')!!}
	{!!Form::select('habitacionAsignada', $habitaciones, null, array('class' => 'form-control'))!!}

	{!!Form::label('idCliente', 'Cliente: ')!!}
	{!!Form::select('idCliente', $clientes, null, array('class' => 'form-control'))!!}

	{!!Form::label('detalle', 'Detalles: ')!!}
	{!!Form::text('detalle', null, $attributes = ['id'=>'detalle', 'class'=>'form-control', 'placeholder'=>'Ingrese detalles adicionales.'])!!}
</div>