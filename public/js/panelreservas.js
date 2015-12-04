var reservas = darJson()["reservas"];
var limiteIzq;
var limiteDer;

$(document).ready(function() {
	Renderizar();

	$('#autoCliente').autocomplete({
	    minLength:2,
		source: function(request, response) {
			$.ajax({
				url: '/getCliente',
				headers: {'X-CSRF-TOKEN': $("#token").val() },
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

function Pintar(reserva) {
	var cliente = reserva.apellido;
	ingreso = new Date(reserva.fechaIngreso);
	egreso = new Date(reserva.fechaEgreso);

	var clase = "";
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

	if (ancho <= 80) {
		cliente = "*";
	}
	clase += " " + reserva.estado.toLowerCase();

	var d1 = $('div.dia-hab[data-hab="'+reserva.idHabitacionAsignada+'"]').filter('[data-dia="'+diaIng+'"]').filter('[data-mes="'+mesIng+'"]');
	var divNuevo = $('<div class="ocupado atras'+clase+'" ></div><div id="'+reserva.id+'" class="ocupado'+clase+'" style="width:'+ancho+'px;" >' + cliente + '</div>');//.draggable({ snap: ".dia-hab", grid: [ 40, 40 ] });
	d1.append(divNuevo);
	divNuevo.click(MostrarDetallesReserva);
}

function MostrarDetallesReserva() {
	$.ajax({
		url: "/reserva/"+this.id,
		headers: {'X-CSRF-TOKEN': $("#token").val() },
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: this.id,
		success: function(data) {
			var reserva = data['reserva'];
			var senias = data['reserva']['senias'];
			var fechaIngreso = reserva.fechaIngreso;
			var fechaEgreso = reserva.fechaEgreso;
			var cuerpo = $("#myModal-info").find("div.modal-body").html("");
			var hab = '';
			hab = reserva.habitacion.numeroHabitacion != 'Depto.' ? 'Hab:<br/>' + reserva.habitacion.numeroHabitacion : 'Depto.' ;
			var stringToAppend = "<div class='info-hab'>" + hab + "</div>";
			stringToAppend += "<p><small><i>Reserva realizada el día " + reserva.fechaReserva + "</i></small></p>";
			stringToAppend += "<p><b>Estado de la reserva:</b> " + reserva.estado.estado + "</p>";
			stringToAppend += "<p><b>Habitación:</b> " + reserva.pax + " " + reserva.habitacion.tipo.tipoHabitacion + "</p>";
			stringToAppend += "<p><b>Entrada:</b> " + fechaIngreso + "</p>";
			stringToAppend += "<p><b>Salida:</b> " + fechaEgreso + "</p>";
			stringToAppend += "<p><b>Noches:</b> " + DiferenciaDias(reserva.fechaIngreso, reserva.fechaEgreso) + "</p>";
			if (reserva.detalle) stringToAppend += "<p><b>Detalles:</b> " + reserva.detalle + "</p>";
			stringToAppend += '<p><b>Señas:</b></p><table class="table"><thead><th>Monto</th><th>Fecha</th><th>Tipo</th><th>Observaciones</th><th></th></thead><tbody id="señas"></tbody></table>';
			
			cuerpo.append(stringToAppend);

			var divSenias = $("tbody#señas");
			var divSeniasParent = divSenias.parent();
			var seniasLength = senias.length;

			divSeniasParent.hide();
			if (seniasLength > 0) {
				divSeniasParent.show();
				cuerpo.append('<button onclick="AgregarSeña(this,'+reserva.id+');" class="btn btn-secondary">Agregar seña</button>');
				for (var i = 0; i < seniasLength; i++) {
					var senia = senias[i];
					MostrarSeña(divSenias, senia);
				};
			} else {
				cuerpo.append('<button onclick="AgregarSeña(this,'+reserva.id+');" class="btn btn-secondary">Agregar seña</button>');
			}

			$("#myModal-info").modal('toggle');
			$(".modal-header").attr('class', 'modal-header').addClass(reserva.estado.estado.toLowerCase());
			$("#myModal-info #tituloReserva").html("Reserva de "+reserva.cliente.nombre+" "+reserva.cliente.apellido);
	    },
		error: function (error) {
			Error("Ha ocurrido un error al cargar la reserva.");
		}
	});
}

function MostrarSeña(divSenias, senia) {
	divSenias.append('<tr><td>$' + senia.monto + '</td><td>' + Formatear(senia.fechaSenia) +
							    		'</td><td>' + senia.tipo.tipoSenia + '</td><td>' + senia.detalle +
							    		"</td><td><button onclick='EliminarSeña(event,this," + senia.id +
							    		")' class='btn btn-danger'>X</button></td></tr>");
}

function AgregarSeña(btn, id) {
	var divSeñas = $("#señas");
	$(btn).hide();
	$("tbody#señas").parent().show();
	var div = $('<tr><td><div class="form-group monto"><div class="input-group"><div class="input-group-addon">$</div><input type="text" placeholder="Monto" id="monto" name="monto" class="form-control" required /></div></td>' +
					   '<td><input type="text" id="datepicker" name="fechaReserva" class="form-control fechaReserva" value="' + Formatear(new Date()) + '" /></td>' +
					   '<td><select id="idTipoSenia" class="form-control"></select></td>' +
					   '<td><textarea class="form-control" rows="2" name="detalleSenia" id="detalleSenia"></textarea></td>' +
					   "<td><button onclick='GuardarSeña(event,"+id+")' class='btn btn-primary'>V</button></td></tr>");
	CargarTiposSenia();
	div.hide();
	divSeñas.append(div);
	divSeñas.find("tr:last").show('slow');
	$("#datepicker").datepicker({dateFormat: "dd/mm/yy"});
}

function GuardarSeña(e, id) {
	e.preventDefault();
	var data = {};
	var tipoSenia = $("#idTipoSenia");
	data.idReserva = id;
	data.idTipoSenia = tipoSenia.val();
	data.monto = $("#monto").val();
	data.detalle = $("#detalleSenia").val();
	data.fechaSenia = DatepickerAMySQL($("#datepicker"));
	tipoSenia = tipoSenia.find(":selected").text();
	$.ajax({
		headers: {'X-CSRF-TOKEN': $("#token").val() },
		url: 'http://localhost:8000/senia',
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(data),
		success: function (datos) {
			data.tipo = {};
			data.tipo.tipoSenia = tipoSenia;
			$("#señas tr:last").hide().remove();
			MostrarSeña($("#señas"), data);
		}
	});
}

function CargarTiposSenia() {
	$.ajax({
		headers: {'X-CSRF-TOKEN': $("#token").val() },
		url: 'http://localhost:8000/senia/create',
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		success: function (data) {
			var stringToAppend = '';
			var dataLength = data.length;
			for (var i = 0; i < dataLength; i++) {
				stringToAppend += '<option value="' + data[i]['id'] + '">' + data[i]['tipoSenia'] + '</option>';
			};
			$("#idTipoSenia").append(stringToAppend);
		}
	});
}

function EliminarSeña(e, btn, id) {
	e.preventDefault();

	$.ajax({
		url: '/senia/'+id,
		headers: { 'X-CSRF-TOKEN': $("#token").val() },
		type: 'DELETE',
		success: function(data, textStatus, xhr) {
			Exito('Seña eliminada correctamente.');
			$(btn).parent().parent().hide('slow').remove();
		},
		error: function(data, textStatus, xhr) {
			Error('Ha ocurrido un error al tratar de eliminar al cliente.');
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
	var stringToAppend = '';
	var diasLength = dias.length;
	var dia = 0;
	for(dia = 0; dia < diasLength; dia++ ) {
		stringToAppend += dias[dia]["dia"] == diaHoy && dias[dia]["mes"] == mesHoy ? "<div class='dia actual'>" + dias[dia]["dia"] + "</div>" : "<div class='dia'>" + dias[dia]["dia"] + "</div>";
	}
	divDias.append(stringToAppend);

	// Creo dias en habs
	var divHabitaciones = $(".habitaciones");
	var diaToAppend = '';
	var divHab = null;
	var jsonHabs = darJson()["habitaciones"];
	$.each(jsonHabs, function (indice, valor) {
		divHab = null;
		divHabitaciones.append('<div class="habitacion" data-id-hab="'+ valor.id +'"><div class="num-hab">' + valor.numeroHabitacion + '</div><input name="'+valor.id+'" type="button" value="+" class="btn btn-primary" onclick="modoEdicionHabitacion(this)" ></input>');
		divHab = $('div.habitacion[data-id-hab='+valor.id+']');
		diaToAppend = '';
		for(dia = 0; dia < diasLength; dia++ ) {
			diaToAppend += '<div id="" class="dia-hab" data-dia="' + dias[dia]["dia"] + '" data-mes="' + (dias[dia]["mes"]+1) + '" data-hab="' + valor.id + '"></div>';
		}
		divHab.append(diaToAppend);
		divHabitaciones.append('</div>');
	});

	$.each(reservas, function (indice, reserva) {
		Pintar(reserva);
	});
}

function ModoEdicion(btn) {
	$(".habitacion").children().bind('click', function(){ return false; });
}

function modoEdicionHabitacion(btn) {
	$('#myModal').modal('toggle');
	Limpiar();
	
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
	reserva.fechaReserva = DatepickerAMySQL($("#fechaReserva"));
	reserva.fechaIngreso = DatepickerAMySQL($("#fechaIngreso"));
	reserva.fechaEgreso = DatepickerAMySQL($("#fechaEgreso"));
	reserva.idCliente = $("#idCliente").val();
	reserva.idEstado = $("#idEstado").val();
	reserva.idHabitacionAsignada = $("#habitacionAsignada").val();
	reserva.detalle = $("#detalle").val();
	reserva.idTipoHabitacion = $("#idTipoHabitacion").val();
	reserva.pax = $("#pax").val();
	var url = "/reserva";

	console.log(new Date($("#fechaIngreso").val()))

	$.ajax({
		url: url,
		headers: {'X-CSRF-TOKEN': token },
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(reserva),
		success: function(data) {
			console.log(data);
			$("#myModal").modal('toggle');
			reserva.estado = data.estado;
			reserva.apellido = data.apellido;
			reserva.id = data.id;
	        Exito('Reserva creada correctamente.');
	        Pintar(reserva);
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