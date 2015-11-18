$(document).ready(function(){

	Renderizar();

	// alert(reservas[0].detalle);
});

function Pintar(hab, ingreso, egreso, cliente, idReserva) {
	ingreso = new Date(ingreso);
	egreso = new Date(egreso);
	var diaIng = ingreso.getDate();
	var diaEgr = egreso.getDate();
	var mesIng = ingreso.getMonth()+1;
	var mesEgr = egreso.getMonth()+1;
	var estadia = diaEgr - diaIng;
	//console.log('pintando ' + hab + " desde " + diaIng  + "/" + mesIng +  " hasta " + diaEgr + "/" + mesEgr);
	var d1 = $('div.dia-hab[data-hab="'+hab+'"]').filter('[data-dia="'+diaIng+'"]')
												 .filter('[data-mes="'+mesIng+'"]');
	d1.append('<div id="'+idReserva+'" class="ocupado" style="width:'+((estadia*40)-25)+'px;" >' + cliente + '</div>');
}

function Renderizar() {
	var fechaIzq = new Date();
	var fechaDer = new Date();
	var diaHoy = fechaDer.getDate();
	var mesHoy = fechaDer.getMonth();

	fechaIzq = fechaIzq.setDate(fechaIzq.getDate() - 7 );
	fechaDer = fechaDer.setDate(fechaDer.getDate() + 21 );
	var limiteIzq = new Date(fechaIzq);
	var limiteDer = new Date(fechaDer);

	// Nombres del mes
	var monthNames = [	"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
						"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
					 ];
	var mesIzq = limiteIzq.getMonth();
	var mesDer = limiteDer.getMonth();

	mesIzq != mesDer ? $("#titulo").html("Reservas entre " + monthNames[mesIzq] + "-" + monthNames[mesDer]) : $("#titulo").html("Reservas de " + monthNames[mesIzq]);

	var dias = [];

	for (var d = limiteIzq; d <= limiteDer; d.setDate(d.getDate() + 1)) {
		diaNuevo = new Date(d);
		dias.push({ "dia" : diaNuevo.getDate(), "mes" : diaNuevo.getMonth() });
	}

	// Creo los dias
	var divDias = $(".dias");
	for( var dia = 0; dia < dias.length; dia++ ) {
		dias[dia]["dia"] == diaHoy && dias[dia]["mes"] == mesHoy ? divDias.append("<div class='dia actual'>" + dias[dia]["dia"] + "</div>") : divDias.append("<div class='dia'>" + dias[dia]["dia"] + "</div>");		
	}

	// Creo dias en habs
	var divHabitaciones = $(".habitaciones");
	$.each(darJson()["habitaciones"], function (indice, valor) {
		divHabitaciones.append('<div class="habitacion" data-id-hab="'+ valor.id +'"><div class="num-hab">' + valor.numeroHabitacion + '</div><input name="'+valor.id+'" type="button" value="+" class="btn btn-primary" onclick="modoEdicionHabitacion(this)" ></input>');
		var divHab = $('div.habitacion[data-id-hab='+valor.id+']');
		for( var dia = 0; dia < dias.length; dia++ ) {
			divHab.append('<div class="dia-hab" data-dia="' + dias[dia]["dia"] + '" data-mes="' + (dias[dia]["mes"]+1) + '" data-hab="' + valor.id + '"></div>');
		}
		divHabitaciones.append('</div>');
	});

	$.each(darJson()["reservas"], function (indice, valor) {
		Pintar(valor.idHabitacionAsignada, valor.fechaIngreso, valor.fechaEgreso, valor.idCliente, valor.id);
	});
}

function ModoEdicion(btn) {
	$(".habitacion").children().bind('click', function(){ return false; });
}

function modoEdicionHabitacion(btn) {
	var habitacion = $(".habitacion");

	var url = 'http://localhost:8000/reserva/'+btn.name+'/edit';
	Limpiar();
	
	$.get(url, function(res) {
		$('#myModal').modal('toggle');
		reserva = JSON.parse(res);
	});

	/*
	habitacion.children().not('div.num-hab').filter('div[data-hab!="'+btn.name+'"]').unbind('click').addClass('deshabilitado');
	habitacion.children().not('div.num-hab').filter('div[data-hab="'+btn.name+'"]').removeClass('deshabilitado').bind('click', function() {
	});
*/
}

$("#crear").click(function(e){
	e.preventDefault();
	var reserva = {};
	var token = $("#token").val();
	reserva.fechaReserva = $("#fechaReserva").val();
	reserva.fechaIngreso = $("#fechaIngreso").val() + ' 10:00:00';
	reserva.fechaEgreso = $("#fechaEgreso").val() + ' 09:59:59';
	reserva.idCliente = $("#idCliente").val();
	reserva.idEstado = $("#idEstado").val();
	reserva.idHabitacionAsignada = $("#habitacionAsignada").val();
	reserva.detalle = $("#detalle").val();
	var url = "http://localhost:8000/reserva";
	
	$.ajax({
		url: url,
		headers: {'X-CSRF-TOKEN': token },
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(reserva),
		success: function(data) {
			$("#myModal").modal('toggle');
	        Exito('Reserva creada correctamente.');
	        Pintar(reserva.idHabitacionAsignada, reserva.fechaIngreso, reserva.fechaEgreso, reserva.idCliente, data.id);
	        Limpiar();
	    },
		error: function (error) {
			if (error.responseJSON != undefined) {
				var mensaje = '';
				if(error.responseJSON.fechaIngreso) mensaje += error.responseJSON.fechaIngreso;
				if(error.responseJSON.fechaEgreso) mensaje += error.responseJSON.fechaEgreso;
				Error(mensaje);
			} else Error("Ha ocurrido un error al tratar de crear la reserva.");
		}
	});
});
