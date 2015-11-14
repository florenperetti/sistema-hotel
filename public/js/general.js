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