-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS eventos;
USE eventos;

CREATE TABLE IF NOT EXISTS evento (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    nombre VARCHAR(100) NOT NULL,
    fecha DATE NOT NULL,
    ubicacion VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS reserva (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()), 
    evento_id CHAR(36) NOT NULL,
    nombre_usuario VARCHAR(100) NOT NULL,
    cantidad_boletos INT NOT NULL CHECK (cantidad_boletos > 0),
    fecha_reserva DATE NOT NULL,
    FOREIGN KEY (evento_id) REFERENCES evento(id) ON DELETE CASCADE
);

INSERT INTO evento (id, nombre, fecha, ubicacion) VALUES 
(UUID(), 'Concierto Rock', '2024-11-10', 'Estadio Central'),
(UUID(), 'Festival de Cine', '2024-12-01', 'Teatro Principal');

SET @evento_id_rock = (SELECT id FROM evento WHERE nombre = 'Concierto Rock');
SET @evento_id_cine = (SELECT id FROM evento WHERE nombre = 'Festival de Cine');

INSERT INTO reserva (id, evento_id, nombre_usuario, cantidad_boletos, fecha_reserva) VALUES 
(UUID(), @evento_id_rock, 'Jorge Perez', 2, '2024-10-15'),
(UUID(), @evento_id_cine, 'Maria Lopez', 4, '2024-10-16');
