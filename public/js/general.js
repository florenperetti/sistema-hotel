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

function FormatearParaDatepicker(fecha) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(fecha);
  return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
}