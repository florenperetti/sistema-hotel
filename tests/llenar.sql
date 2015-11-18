INSERT INTO `hotel`.`estadoreserva` (`estado`) VALUES ('PENDIENTE');
INSERT INTO `hotel`.`estadoreserva` (`estado`) VALUES ('ACTIVA');
INSERT INTO `hotel`.`estadoreserva` (`estado`) VALUES ('CANCELADA');

INSERT INTO `hotel`.`tipohabitacion` (`tipoHabitacion`) VALUES ('MAT');
INSERT INTO `hotel`.`tipohabitacion` (`tipoHabitacion`) VALUES ('IND');
INSERT INTO `hotel`.`tipohabitacion` (`tipoHabitacion`) VALUES ('DEPTO');

INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('1', '1', '2');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('2', '1', '3');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('4', '1', '2');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('5', '1', '3');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('6', '1', '3');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('7', '1', '3');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('8', '2', '2');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('9', '2', '3');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('10', '1', '3');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('11', '2', '3');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('12', '2', '2');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('14', '2', '5');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('15', '2', '4');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('16', '2', '4');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('17', '1', '2');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('18', '1', '3');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('19', '2', '3');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('20', '1', '3');
INSERT INTO `hotel`.`habitacion` (`numeroHabitacion`, `idTipoHabitacion`, `capacidad`) VALUES ('21', '1', '5');

INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Córdoba');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Santa Fe');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Tucumán');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Buenos Aires');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Catamarca');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Corrientes');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Chaco');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Chubut');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Entre Ríos');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Formosa');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Jujuy');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('La Pampa');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('La Rioja');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Mendoza');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Misiones');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Neuquén');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Río Negro');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Salta');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('San Juan');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('San Luis');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Santa Cruz');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Santiago del Estero');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Tierra del Fuego');
INSERT INTO `hotel`.`provincia` (`nombre`) VALUES ('Otra');

INSERT INTO `hotel`.`tiposenia` (`tipoSenia`) VALUES ('Deposito');
INSERT INTO `hotel`.`tiposenia` (`tipoSenia`) VALUES ('Transferencia');
INSERT INTO `hotel`.`tiposenia` (`tipoSenia`) VALUES ('Contado');

INSERT INTO `hotel`.`cliente` (`nombre`, `email`) VALUES ('Flor', 'florenperetti@gmail.com');

INSERT INTO `hotel`.`reserva` (`idEstado`, `idCliente`, `detalle`, `fechaReserva`, `fechaIngreso`, `fechaEgreso`, `idHabitacionAsignada`) VALUES ('1', '2', 'Test', '2015-11-25 10:00:00', '2015-12-25 10:00:00', '2015-12-30 10:00:00', '15');