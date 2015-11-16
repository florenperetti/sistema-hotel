$(document).ready(function(){

	Renderizar();

	// alert(reservas[0].detalle);
});

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
		divHabitaciones.append('<div class="habitacion" data-numero-hab="'+ valor.numeroHabitacion +'"><div class="num-hab">' + valor.numeroHabitacion + '</div><input name="'+valor.numeroHabitacion+'" type="button" value="+" class="btn btn-primary" onclick="modoEdicionHabitacion(this)" ></input>');
		var divHab = $('div.habitacion[data-numero-hab='+valor.numeroHabitacion+']');
		for( var dia = 0; dia < dias.length; dia++ ) {
			divHab.append('<div class="dia-hab" data-dia="' + dias[dia]["dia"] + '" data-mes="' + dias[dia]["mes"] + '" data-hab="' + valor.numeroHabitacion + '"></div>');
		}
		divHabitaciones.append('</div>');
	});

	$.each(darJson()["reservas"], function (indice, valor) {
		pintar(valor.habitacionAsignada, valor.fechaIngreso, valor.fechaEgreso);
	});
}

function pintar(hab, ingreso, egreso) {
	ingreso = new Date(ingreso);
	egreso = new Date(egreso);
	var diaIng = ingreso.getDate();
	var diaEgr = egreso.getDate();
	var mesIng = ingreso.getMonth()+1;
	var mesEgr = egreso.getMonth()+1;
	var estadia = diaEgr - diaIng;

	var d1 = $('div.dia-hab[data-hab="'+hab+'"]').filter('[data-dia="'+diaIng+'"]')
												 .filter('[data-mes="'+mesIng+'"]')
		.append('<div class="ocupado" style="width:'+estadia*40+'px;" >hola</div>');
}

function ModoEdicion(btn) {
	$(".habitacion").children().bind('click', function(){ return false; });
}

function modoEdicionHabitacion(btn) {
	var habitacion = $(".habitacion");

	var url = 'http://localhost:8000/reserva/'+btn.nombre+'/edit';
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
