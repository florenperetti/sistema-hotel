@extends('layouts.admin')

@section('contenido')
	{!!Form::open()!!}
		<div id="msj-success" class="alert alert-success alert-dismissible" role="alert" style="display:none">
			<strong>Cliente Agregado Correctamente.</strong>
		</div>
		<input type="hidden" name="_token" value="{{ csrf_token() }}" id="token">
		@include('cliente.form.cliente')
		{!!link_to('#', $title='Registrar', $attributes = ['id'=>'registro', 'class'=>'btn btn-primary', $secure = null ])!!}
	{!!Form::close()!!}

@endsection

@section('scripts')
	{!!Html::script('js/cliente.js')!!}
@endsection