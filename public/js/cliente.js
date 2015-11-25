$("#registro").click(function(e){
	e.preventDefault();
	var cliente = {};
	var token = $("#token").val();
	cliente.nombre = $("#nombre").val();
	cliente.apellido = $("#apellido").val();
	cliente.telefono = $("#telefono").val();
	cliente.direccion = $("#direccion").val();
	cliente.localidad = $("#localidad").val();
	cliente.idProvincia = $("#idProvincia").val();
	cliente.email = $("#email").val();

	var url = "http://localhost:8000/cliente";
	
	$.ajax({
		url: url,
		headers: {'X-CSRF-TOKEN': token },
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(cliente),
		success: function(data) {
	        Exito('Cliente creado correctamente.');
	    },
		error: function (msj) {
			var mensaje = '';
			if (msj.responseJSON.nombre != null) mensaje += msj.responseJSON.nombre +"<br/>";
			if (msj.responseJSON.apellido != null) mensaje += msj.responseJSON.apellido +"<br/>";
			if(mensaje == '') mensaje += "Ha ocurrido un error al tratar de crear al cliente.";
			Error(mensaje);
       }
	});
});