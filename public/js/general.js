function Exito(mensaje) {
	$("#msj-exito").html(mensaje);
	$("#exito").fadeIn();
}

function Error(mensaje) {
	$("#msj-error").html(mensaje);
	$("#error").fadeIn();
}

function Limpiar() {
	$("#exito").fadeOut();
	$("#error").fadeOut();
}

function Confirm(titulo, pregunta, cancelButtonTxt, okButtonTxt, data, callback) {

	var confirmModal = $('#confirm-modal');
	confirmModal.find('#confirm-titulo').html(titulo);
	confirmModal.find('#confirm-pregunta').html(pregunta);
	confirmModal.find('#cancelButton').html(cancelButtonTxt);
	var okButton = confirmModal.find('#okButton').html(okButtonTxt);

	okButton.click(function(e) {
		e.preventDefault();
		callback(data);
		confirmModal.modal('hide');
	});

	confirmModal.modal('show');     
};

function DiferenciaDias(fechaInicio, fechaFin) {
	var timeDiff = Math.abs(new Date(fechaFin).getTime() - new Date(fechaInicio).getTime());
	return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

function Formatear(fecha) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(fecha);

  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

function DatepickerAMySQL(datepicker) {
	var d = new Date(datepicker.datepicker('getDate'));
	return d.toYMD();
}

Date.prototype.toYMD = Date_toYMD;

function Date_toYMD() {
    var year, month, day;
    year = String(this.getFullYear());
    month = String(this.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = String(this.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
}