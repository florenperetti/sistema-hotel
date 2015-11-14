$("#registro").click(function(e){
	e.preventDefault();
	var cliente = {};
	var token = $("#token").val();
	cliente.nombre = $("#nombre").val();
	cliente.telefono = $("#telefono").val();
	cliente.direccion = $("#direccion").val();
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
			msj.responseJSON.nombre != null ? Error(msj.responseJSON.nombre) : Error("Ha ocurrido un error al tratar de crear al cliente.");
       }
	});
});