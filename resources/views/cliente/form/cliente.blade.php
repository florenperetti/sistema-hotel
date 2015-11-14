<div class="form-group">
	@include('alerts.error')
	
	{!!Form::label('nombre', 'Nombre: ')!!}
	{!!Form::text('nombre', null, $attributes = ['id'=>'nombre', 'class'=>'form-control', 'placeholder'=>'Ingresa el nombre del cliente.'])!!}

	{!!Form::label('telefono', 'Teléfono: ')!!}
	{!!Form::text('telefono', null, $attributes = ['id'=>'telefono', 'class'=>'form-control', 'placeholder'=>'Ingresa el teléfono del cliente.'])!!}

	{!!Form::label('direccion', 'Dirección: ')!!}
	{!!Form::text('direccion', null, $attributes = ['id'=>'direccion', 'class'=>'form-control', 'placeholder'=>'Ingresa la dirección del cliente.'])!!}

	{!!Form::label('idProvincia', 'Provincia: ')!!}
	{!!Form::select('idProvincia', $provincias, null, array('class' => 'form-control'))!!}

	{!!Form::label('email', 'Email: ')!!}
	{!!Form::text('email', null, $attributes = ['id'=>'email', 'class'=>'form-control', 'placeholder'=>'Ingresa el email del cliente.'])!!}
</div>