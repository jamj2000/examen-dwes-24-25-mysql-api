DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;
USE hospital;


CREATE TABLE medicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    especialidad VARCHAR(200),
    perfil ENUM ('RESIDENTE', 'ESPECIALISTA')
);


INSERT INTO medicos (nombre, especialidad, perfil) 
VALUES 
  ('Pedro', 'Traumatologo', 'ESPECIALISTA'),
  ('Ana', 'Dermatologo', 'RESIDENTE'),
  ('Juan', 'Atencion primaria', 'RESIDENTE');

CREATE TABLE pacientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200),
    fecha_nacimiento DATE
);

INSERT INTO pacientes (nombre, localidad, fecha_nacimiento) 
VALUES 
  ('Rafael', 'Cordoba', '2000-01-01'),
  ('David', 'Montilla', '1995-02-02'),
  ('Carlos', 'Carteya', '1990-03-03');