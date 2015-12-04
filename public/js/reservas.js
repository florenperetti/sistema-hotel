$(document).ready(function(){
	Cargar();

	$('#autoCliente').autocomplete({
	    minLength:2,
		source: function(request, response) {
			var token = $("#token").val();
			$.ajax({
				url: 'http://localhost:8000/getCliente',
				headers: {'X-CSRF-TOKEN': token },
				data: { term : $('#autoCliente').val() },
				dataType: "json",
				type: 'post',
				success: function(data) {
					response(data);
				}
			});
		},
  	  	select: function( event, ui ) {
	        $('#idCliente').val(ui.item.id);
	        $('#autoCliente').val(ui.item.value);
	    }
    });

    $("#fechaIngreso").datepicker({dateFormat: "dd/mm/yy"});
    $("#fechaEgreso").datepicker({dateFormat: "dd/mm/yy"});
    $("#fechaReserva").datepicker({dateFormat: "dd/mm/yy"});
});

function Cargar() {
	var datos = $('#datos');
	var url = '/reservas';
	$('#datos').empty();
	$.get(url, function(res) {
		$(JSON.parse(res)).each(function(key, valor){
			datos.append("<tr><td>"+Formatear(valor.fechaIngreso)+"</td><td>"+Formatear(valor.fechaEgreso)+"</td><td>"+DiferenciaDias(valor.fechaIngreso,valor.fechaEgreso)+"</td><td>"+valor.estado+"</td><td>"+valor.nombre+"</td><td>x"+valor.pax + " " + valor.tipoHabitacion + "</td><td>" + valor.numeroHabitacion + "</td><td>" + Formatear(valor.fechaReserva) + "</td><td><button class='btn btn-primary' value='"+ valor.id +"' OnClick='Mostrar(this);'>Editar</button><button class='btn btn-danger' value='"+ valor.id +"' OnClick='Eliminar(this);'>Eliminar</button></td><tr>");
		});
	});

	Limpiar();
}

function Eliminar(btn) {
	Limpiar();
    Confirm('Eliminar reserva', '¿Está seguro de que desea eliminar la reserva?', 'Cancelar', 'Continuar', btn, function(btn) {
		var url = '/reserva/'+btn.value+'';
		var token = $("#token").val();

		$.ajax({
			url: url,
			headers: { 'X-CSRF-TOKEN': token },
			type: 'DELETE',
			cache: false,
			success: function(data, textStatus, xhr) {
				Exito('Reserva eliminada correctamente.');
				$("#reserva-"+btn.value).fadeOut('400');
			},
			error: function(data, textStatus, xhr) {
				Error('Ha ocurrido un error al tratar de eliminar la reserva.');
			}
		});
    });
};

function Mostrar(btn){
	var url = '/reserva/'+btn.value+'/edit';
	Limpiar();
	$.get(url, function(res) {
		$('#myModal').modal('toggle');
		reserva = JSON.parse(res);
		$('#myModalLabel').html('Editar Reserva');
		$('a#crear').hide();
		$('a#actualizar').removeClass('oculto');
		$('#fechaReserva').val(Formatear(reserva.fechaReserva));
		$('#fechaIngreso').val(Formatear(reserva.fechaIngreso));
		$("#fechaEgreso").val(Formatear(reserva.fechaEgreso));
		$("#idEstado").val(reserva.idEstado);
		$("#pax").val(reserva.pax);
		$("#autoCliente").val(reserva.cliente.nombre + " " + reserva.cliente.apellido);
		$("#idCliente").val(reserva.idCliente);
		$("#habitacionAsignada").val(reserva.idHabitacionAsignada);
		$("#idTipoHabitacion").val(reserva.idTipoHabitacion);
		$("#detalle").val(reserva.detalle);
		$('#id').val(reserva.id);
	});
}

$('#actualizar').click(function(e){
	e.preventDefault();
	var fechaIngreso, fechaEgreso, fechaReserva;
	fechaIngreso = new Date($("#fechaIngreso").val());
	fechaEgreso = new Date($('#fechaEgreso').val());
	fechaReserva = new Date($('#fechaReserva').val());

	var id = $('#id').val();
	var reserva = {};
	reserva.id = $('#id').val();
	reserva.fechaReserva = fechaReserva.toYMD();
	reserva.fechaIngreso = fechaIngreso.toYMD();
	reserva.fechaEgreso = fechaEgreso.toYMD();
	reserva.idEstado = $("#idEstado").val();
	reserva.pax = $("#pax").val();
	reserva.idCliente = $("#idCliente").val();
	reserva.idHabitacionAsignada = $("#habitacionAsignada").val();
	reserva.idTipoHabitacion = $("#idTipoHabitacion").val();
	reserva.detalle = $("#detalle").val();
console.log(reserva);
	var url = "/reserva/"+id+"";
	var token = $("#token").val();
	$.ajax({
		url: url,
		headers: { 'X-CSRF-TOKEN': token },
		type: 'PUT',
		cache: false,
		data: reserva,
		success: function(data, textStatus, xhr) {
			Cargar();
			$("#myModal").modal('toggle');
			Exito('Reserva actualizada correctamente.');
		},
		error: function(error) {
			if (error.responseJSON != undefined) {
				var mensaje = '';
				if(error.responseJSON.fechaIngreso) mensaje += error.responseJSON.fechaIngreso;
				if(error.responseJSON.fechaEgreso) mensaje += error.responseJSON.fechaEgreso;
				Error(mensaje);
			} else Error("Ha ocurrido un error al tratar de actualizar la reserva.");
		}
	});
});