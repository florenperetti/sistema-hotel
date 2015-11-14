@extends('layouts.admin')

@section('contenido')
	{!!Form::open()!!}
		<input type="hidden" name="_token" value="{{ csrf_token() }}" id="token">
		@include('cliente.form.cliente')
		{!!link_to('#', $title='Registrar', $attributes = ['id'=>'registro', 'class'=>'btn btn-primary', $secure = null ])!!}
	{!!Form::close()!!}

@endsection

@section('scripts')
	{!!Html::script('js/cliente.js')!!}
@endsection