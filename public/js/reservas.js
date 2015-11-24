var reservas = darJson()["reservas"];
var limiteIzq;
var limiteDer;

$(document).ready(function() {
	Renderizar();

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
});

function Pintar(hab, ingreso, egreso, cliente, idReserva) {
	ingreso = new Date(ingreso);
	egreso = new Date(egreso);

	var clase = "ocupado";
	if (ingreso < limiteIzq) { // Si ingresa antes de limite izq
		ingreso = new Date(limiteIzq);
		clase += " antes";
	}
	if(egreso > limiteDer) {
		egreso = new Date(limiteDer);
		clase += " despues";
	}

	var diaIng = ingreso.getDate();
	var mesIng = ingreso.getMonth()+1;
	var estadia = DiferenciaDias(ingreso,egreso);
	var ancho = 0;
	if(clase.indexOf("antes") > -1) {
		estadia++;
	}
	
	ancho = (estadia*40)-25;

	if(clase.indexOf("despues") > -1) {
		estadia--;
		ancho = estadia*40;
	}

	var d1 = $('div.dia-hab[data-hab="'+hab+'"]').filter('[data-dia="'+diaIng+'"]')
												 .filter('[data-mes="'+mesIng+'"]');
	var divNuevo = $('<div id="'+idReserva+'" class="'+clase+'" style="width:'+ancho+'px;" >' + cliente + '</div>');//.draggable({ snap: ".dia-hab", grid: [ 40, 40 ] });
	d1.append(divNuevo);
	divNuevo.click(MostrarDetallesReserva);
}

function MostrarDetallesReserva() {
	var token = $("#token").val();
	var url = "http://localhost:8000/reserva/"+this.id;
	$.ajax({
		url: url,
		headers: {'X-CSRF-TOKEN': token },
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: this.id,
		success: function(data) {
			console.log(data);
			var fechaIngreso = Formatear(data.fechaIngreso);
			var fechaEgreso = Formatear(data.fechaEgreso);
			var cuerpo = $("#myModal-info").find("div.modal-body").html("");
			cuerpo.append("<p>Estado de la reserva: " + data.estado + "</p>");
			cuerpo.append("<p><b>In/Out:</b> de " + fechaIngreso + " al " + fechaEgreso + "</i> (" + DiferenciaDias(data.fechaIngreso, data.fechaEgreso) + " noches)</p>");
			cuerpo.append("<p>Pax: " + data.pax + " " + data.tipoHabitacion + "</p>");
			cuerpo.append("<p>Habitación: " + data.numeroHabitacion + "</p>");
			if (data.detalle) cuerpo.append("<p>Detalles:</p><p>" + data.detalle + "</p>");
			$("#myModal-info").modal('toggle');
			$("#myModal-info #tituloReserva").html("Reserva de "+data.nombre);
	    },
		error: function (error) {
			Error("Ha ocurrido un error al cargar la reserva.");
		}
	});
}

function Renderizar() {
	var fechaIzq = new Date();
	var fechaDer = new Date();
	var diaHoy = fechaDer.getDate();
	var mesHoy = fechaDer.getMonth();

	fechaIzq = fechaIzq.setDate(fechaIzq.getDate() - 7 );
	fechaDer = fechaDer.setDate(fechaDer.getDate() + 21 );
	limiteIzq = new Date(fechaIzq);
	limiteDer = new Date(fechaDer);
	
	// Nombres del mes
	var monthNames = [	"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
						"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
					 ];
	var mesIzq = limiteIzq.getMonth();
	var mesDer = limiteDer.getMonth();

	mesIzq != mesDer ? $("#titulo").html("Reservas entre " + monthNames[mesIzq] + "-" + monthNames[mesDer]) : $("#titulo").html("Reservas de " + monthNames[mesIzq]);

	var dias = [];

	for (var d = new Date(limiteIzq); d <= limiteDer; d.setDate(d.getDate() + 1)) {
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
			divHab.append('<div id="" class="dia-hab" data-dia="' + dias[dia]["dia"] + '" data-mes="' + (dias[dia]["mes"]+1) + '" data-hab="' + valor.id + '"></div>');
		}
		divHabitaciones.append('</div>');
	});

	$.each(reservas, function (indice, valor) {
		
		Pintar(valor.idHabitacionAsignada, valor.fechaIngreso, valor.fechaEgreso, valor.nombre, valor.id);
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
	reserva.idTipoHabitacion = $("#idTipoHabitacion").val();
	reserva.pax = $("#pax").val();
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
	        Pintar(reserva.idHabitacionAsignada, reserva.fechaIngreso, reserva.fechaEgreso, data.nombre, data.id);
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
