$("#registro").click(function(e){
	e.preventDefault();
	var reserva = {};
	var token = $("#token").val();
	reserva.fechaReserva = $("#fechaReserva").val();
	reserva.fechaIngreso = $("#fechaIngreso").val();
	reserva.fechaEgreso = $("#fechaEgreso").val();
	reserva.idCliente = $("#idCliente").val();
	reserva.idEstado = $("#idEstado").val();
	reserva.habitacionAsignada = $("#habitacionAsignada").val();
	reserva.detalle = $("#detalle").val();
console.log(reserva);
	var url = "http://localhost:8000/reserva";
	
	$.ajax({
		url: url,
		headers: {'X-CSRF-TOKEN': token },
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(reserva),
		success: function(data) {
	        Exito('Reserva creada correctamente.');
	    },
		error: function (msj) {
			msj.responseJSON.nombre != null ? Error(msj.responseJSON.nombre) : Error("Ha ocurrido un error al tratar de crear la reserva.");
       }
	});
});