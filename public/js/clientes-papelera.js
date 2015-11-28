$(document).ready(function(){
	Cargar();
});

function Cargar() {
	var datos = $('#datos');
	var url = 'http://localhost:8000/clientes/eliminados';
	$('#datos').empty();
	$.get(url, function(res) {
		$(JSON.parse(res)).each(function(key, valor){
			datos.append("<tr id='cliente-"+valor.id+"'><td>"+valor.nombre+"</td><td>"+valor.apellido+"</td><td>"+valor.telefono+"</td><td>"+valor.direccion+"</td><td>"+valor.localidad+"</td><td>"+valor.provincia+"</td><td>"+valor.email+"</td><td><button class='btn btn-primary' value='"+ valor.id +"' OnClick='Restaurar(event, this, "+ valor.id +");'>Restaurar</button><button class='btn btn-danger' OnClick='Eliminar(this, " + valor.id + ");'>Eliminar</button></td><tr>");
		});
	});

	Limpiar();
}

function Restaurar(e, btn, id) {
	e.preventDefault();
	var token = $('#token').val();
	$.ajax({
		url : 'http://localhost:8000/cliente/' + id + '/restaurar',
		type: 'POST',
		dataType: 'json',
		data: id,
		headers: { 'X-CSRF-TOKEN': token },
		success: function(data) {
			console.log(data);
			$(btn).parent().parent().fadeOut("slow");
		},
		error: function(err) {
			console.log(err.responseText);
		}
	});
}