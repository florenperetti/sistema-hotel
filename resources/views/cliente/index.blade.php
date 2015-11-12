@extends('layouts.admin')

@section('contenido')
	<table class="table">
		<thead>
			<th>Nombre</th>
			<th>Teléfono</th>
			<th>Dirección</th>
			<th>Provincia</th>
			<th>Email</th>
			<th>Operaciones</th>
		</thead>
		<tbody id="datos">
		</tbody>
	</table>
@endsection

@section('scripts')
	<script type="text/javascript">
		function darJson() {
			return <?php echo json_encode($clientes); ?>;
		}
	</script>
	{!!Html::script('js/clientes.js')!!}
@endsection