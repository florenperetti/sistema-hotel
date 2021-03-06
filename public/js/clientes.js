$(document).ready(function(){
	Cargar();
});

function Cargar() {
	var datos = $('#datos');
	var url = 'http://localhost:8000/clientes';
	$('#datos').empty();
	$.get(url, function(res) {
		$(JSON.parse(res)).each(function(key, valor){
			datos.append("<tr id='cliente-"+valor.id+"'><td>"+valor.nombre+"</td><td>"+valor.apellido+"</td><td>"+valor.telefono+"</td><td>"+valor.direccion+"</td><td>"+valor.localidad+"</td><td>"+valor.provincia+"</td><td>"+valor.email+"</td><td><button class='btn btn-primary' value='"+ valor.id +"' OnClick='Mostrar(this);'>Editar</button><button class='btn btn-danger' value='"+ valor.id +"' OnClick='Eliminar(this);'>Eliminar</button></td><tr>");
		});
	});

	Limpiar();
}

function Eliminar(btn) {
	Limpiar();
    Confirm('Eliminar cliente', '¿Está seguro de que desea eliminar al cliente?', 'Cancelar', 'Continuar', btn, function(btn) {
		var url = 'http://localhost:8000/cliente/'+btn.value+'';
		var token = $("#token").val();

		$.ajax({
			url: url,
			headers: { 'X-CSRF-TOKEN': token },
			type: 'DELETE',
			cache: false,
			success: function(data, textStatus, xhr) {
				Exito('El cliente fue movido a la papelera.');
				$("#cliente-"+btn.value).fadeOut('400');
			},
			error: function(data, textStatus, xhr) {
				Error('Ha ocurrido un error al tratar de eliminar al cliente.');
			}
		});
    });
};

function Mostrar(btn){
	var url = 'http://localhost:8000/cliente/'+btn.value+'/edit';
	Limpiar();
	$.get(url, function(res) {
		$('#myModal').modal('toggle');
		cliente = JSON.parse(res);
		$('#nombre').val(cliente.nombre);
		$('#apellido').val(cliente.apellido);
		$("#telefono").val(cliente.telefono);
		$("#direccion").val(cliente.direccion);
		$("#localidad").val(cliente.localidad);
		$("#idProvincia").val(cliente.idProvincia);
		$("#email").val(cliente.email);
		$('#id').val(cliente.id);
	});
	
}

$('#actualizar').click(function(e){
	e.preventDefault();
	var id = $('#id').val();
	var cliente = {};
	cliente.id = id;
	cliente.nombre = $("#nombre").val();
	cliente.apellido = $("#apellido").val();
	cliente.telefono = $("#telefono").val();
	cliente.direccion = $("#direccion").val();
	cliente.localidad = $("#localidad").val();
	cliente.idProvincia = $("#idProvincia").val();
	cliente.email = $("#email").val();

	var url = "http://localhost:8000/cliente/"+id+"";
	var token = $("#token").val();
	$.ajax({
		url: url,
		headers: { 'X-CSRF-TOKEN': token },
		type: 'PUT',
		cache: false,
		data: cliente,
		success: function(data, textStatus, xhr) {
			Cargar();
			$("#myModal").modal('toggle');
			Exito('Cliente actualizado correctamente.');
		},
		error: function(error) {
			var mensaje = '';
			if (msj.responseJSON.nombre != null) mensaje += msj.responseJSON.nombre +"<br/>";
			if (msj.responseJSON.apellido != null) mensaje += msj.responseJSON.apellido +"<br/>";
			if (mensaje == '') mensaje += "Ha ocurrido un error al tratar de actualizar al cliente.";
			Error(mensaje);
		}
	});
});