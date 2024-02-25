-- Active: 1708525565630@@127.0.0.1@5432@name_db
CREATE TABLE alumno (
    idalum SERIAL PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL
);

INSERT INTO alumno (nombres, apellidos) VALUES
('Luis Antonio', 'Alvarez Oval'),
('Juan Ro', 'Maldonado Perez');

SELECT * FROM alumno;

CREATE TABLE maestro(
    idmaes SERIAL PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL
);

INSERT INTO maestro (nombres, apellidos) VALUES
('Vanessa', 'Benavides Garcia'),
('Paola', 'Sanchez');

SELECT * FROM maestro;

CREATE TABLE materia (
    idmat SERIAL PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    grado INTEGER NOT NULL
);

INSERT INTO materia (nombres, grado) VALUES
('Matematicas', 2),
('Geografia', 2);

SELECT * FROM materia;

CREATE TABLE login (
    idlog SERIAL PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    passwrd VARCHAR(255) NOT NULL
);

INSERT INTO login (usuario, passwrd) VALUES 
('ravenMain', 'root'),
('mainLake', 'root');

SELECT * FROM login;