$(document).ready(function(){

	// Llenar plantilla
	$.each(darJson(), function (indice, valor) {
		pintar(valor.habitacionAsignada, valor.fechaIngreso, valor.fechaEgreso);
	});

	// alert(reservas[0].detalle);

	$(".habitacion").children().bind('click', function(){ return false; });

	$('div[data-dia]').click(modoEdicionHabitacion);
});

function modoEdicionHabitacion() {
	var habitacion = $(this).attr('data-hab');

	// TODO deshabilito click en resto de habs
	// $(".habitacion").children().not('div.num-hab').filter('div[data-hab!="'+habitacion+'"]').unbind('click').addClass('deshabilitado');
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