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

function Pintar(reserva) {
	var cliente = reserva.apellido;
	ingreso = new Date(reserva.fechaIngreso);
	egreso = new Date(reserva.fechaEgreso);

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

	if (ancho <= 80) {
		cliente = "*";
	}
	clase += " " + reserva.estado.toLowerCase();

	var d1 = $('div.dia-hab[data-hab="'+reserva.idHabitacionAsignada+'"]').filter('[data-dia="'+diaIng+'"]')
												 .filter('[data-mes="'+mesIng+'"]');
	var divNuevo = $('<div id="'+reserva.id+'" class="'+clase+'" style="width:'+ancho+'px;" >' + cliente + '</div>');//.draggable({ snap: ".dia-hab", grid: [ 40, 40 ] });
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
			var reserva = data['reserva'];
			var senias = data['reserva']['senias'];
			var fechaIngreso = Formatear(reserva.fechaIngreso);
			var fechaEgreso = Formatear(reserva.fechaEgreso);
			var cuerpo = $("#myModal-info").find("div.modal-body").html("");
			var hab = '';
			hab = reserva.habitacion.numeroHabitacion != 'Depto.' ? 'Hab:<br/>' + reserva.habitacion.numeroHabitacion : 'Depto.' ;
			cuerpo.append("<div class='info-hab'>" + hab + "</div>");
			cuerpo.append("<p><small><i>Reserva realizada el día " + Formatear(reserva.fechaReserva) + "</i></small></p>");
			cuerpo.append("<p><b>Estado de la reserva:</b> " + reserva.estado.estado + "</p>");
			cuerpo.append("<p><b>Habitación:</b> " + reserva.pax + " " + reserva.habitacion.tipo.tipoHabitacion + "</p>");
			cuerpo.append("<p><b>Entrada:</b> " + fechaIngreso + "</p>");
			cuerpo.append("<p><b>Salida:</b> " + fechaEgreso + "</p>");
			cuerpo.append("<p><b>Noches:</b> " + DiferenciaDias(reserva.fechaIngreso, reserva.fechaEgreso) + "</p>");
			if (reserva.detalle) cuerpo.append("<p><b>Detalles:</b> " + reserva.detalle + "</p>");
			cuerpo.append('<p><b>Señas:</b></p><table class="table"><thead><th>Monto</th><th>Fecha</th><th>Tipo</th><th>Observaciones</th><th></th></thead><tbody id="señas"></tbody></table>');
			var divSenias = $("tbody#señas");
			divSenias.parent().hide();
			if (senias.length > 0) {
				divSenias.parent().show();
				cuerpo.append('<button onclick="AgregarSeña(this,'+reserva.id+');" class="btn btn-secondary">Agregar seña</button>');
				for (var i = 0; i < senias.length; i++) {
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
			console.log(error.responseText);
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
	$(btn).hide();
	$("tbody#señas").parent().show();
	var div = $('<tr><td><div class="form-group monto"><div class="input-group"><div class="input-group-addon">$</div><input type="text" placeholder="Monto" id="monto" name="monto" class="form-control" required /></div></td>' +
					   '<td><input type="text" id="datepicker" name="fechaReserva" class="form-control fechaReserva" value="' + Formatear(new Date()) + '" /></td>' +
					   '<td><select id="idTipoSenia" class="form-control"></select></td>' +
					   '<td><textarea class="form-control" rows="2" name="detalleSenia" id="detalleSenia"></textarea></td>' +
					   "<td><button onclick='GuardarSeña(event,"+id+")' class='btn btn-primary'>V</button></td></tr>");
	CargarTiposSenia();
	div.hide();
	$("#señas").append(div);
	$("#señas tr:last").show('slow');
	$("#datepicker").datepicker({dateFormat: "dd/mm/yy"});
}

function GuardarSeña(e, id) {
	e.preventDefault();
	var token = $("#token").val();
	var data = {};
	data.idReserva = id;
	data.monto = $("#monto").val();
	data.idTipoSenia = $("#idTipoSenia").val();
	data.detalle = $("#detalleSenia").val();
	var tipoSenia = $("#idTipoSenia").find(":selected").text();
	var d = new Date($("#datepicker").val());
	data.fechaSenia = d.toYMD();

	$.ajax({
		headers: {'X-CSRF-TOKEN': token },
		url: 'http://localhost:8000/senia',
		type: 'POST',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		data: JSON.stringify(data),
		success: function (datos) {
			data.tipo = {};
			data.tipo.tipoSenia = tipoSenia;
			var divSenia = $("#señas tr:last").hide().remove();
			MostrarSeña($("#señas"), data);
		},
		error: function (error) {
			console.log(error.responseText);
		}
	});
}

function CargarSenias(idReserva) {
	var token = $("#token").val();
	$.ajax({
		headers: {'X-CSRF-TOKEN': token },
		url: 'http://localhost:8000/senia/',
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		success: function (data) {
			for (var i = 0; i < data.length; i++) {
				$("#idTipoSenia").append('<option value="' + data[i]['id'] + '">' + data[i]['tipoSenia'] + '</option>');
			};
		},
		error: function (error) {
			console.log(error.responseText);
		}
	});
}

function CargarTiposSenia() {
	var token = $("#token").val();
	$.ajax({
		headers: {'X-CSRF-TOKEN': token },
		url: 'http://localhost:8000/senia/create',
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		dataType: 'json',
		success: function (data) {
			for (var i = 0; i < data.length; i++) {
				$("#idTipoSenia").append('<option value="' + data[i]['id'] + '">' + data[i]['tipoSenia'] + '</option>');
			};
		},
		error: function (error) {
			console.log(error.responseText);
		}
	});
}

function EliminarSeña(e, btn, id) {
	e.preventDefault();
	var token = $("#token").val();
	var url = 'http://localhost:8000/senia/'+id+'';

	$.ajax({
		url: url,
		headers: { 'X-CSRF-TOKEN': token },
		type: 'DELETE',
		success: function(data, textStatus, xhr) {
			Exito('Seña eliminada correctamente.');
			$(btn).parent().parent().hide('slow').remove();
		},
		error: function(data, textStatus, xhr) {
			console.log(data.responseText);
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

	$.each(reservas, function (indice, reserva) {
		Pintar(reserva);
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