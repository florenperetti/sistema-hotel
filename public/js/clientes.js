$(document).ready(function(){
	var datos = $('#datos');
	var url = 'http://localhost:8000/clientes';

	$.each(darJson(), function (indice, valor) {
		datos.append("<tr><td>"+valor.nombre+"</td><td>"+valor.telefono+"</td><td>"+valor.direccion+"</td><td>"+valor.idProvincia+"</td><td>"+valor.email+"</td><td><button class='btn btn-primary' value='"+ valor.id +"' OnClick='Mostrar(this);'>Editar</button><button class='btn btn-danger'>Eliminar</button></td><tr>");
	});
});

function Mostrar(btn){
	var url = 'http://localhost:8000/cliente/'+btn.value+'/edit';

	$.get(url, function(res) {
		alert(res.cliente);
		$('#cliente').val(res.cliente);
		$('#id').val(res.id);
	});
}