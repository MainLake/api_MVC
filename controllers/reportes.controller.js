const Alumno = require('../models/alumno.model');
const Materia = require('../models/materia.model');
const Maestro = require('../models/maestro.model');
const Detalle = require('../models/detalle.model');

const obtenerAlumnosXMateria = async (request, response) => {

    try {
        const data = await Detalle.findAll({
            include: [
                {
                    model: Alumno,
                    attributes: ['nombres', 'apellidos', 'idalum'],
                },
                {
                    model: Materia,
                    attributes: ['nombres', 'grado'],
                },
            ],
            order: [
                [{ model: Alumno }, 'nombres', 'ASC'],
                [{ model: Materia }, 'nombres', 'ASC'],
            ],
        });
        console.log(data);

        return response.status(200).json({
            data: data
        }).end();


    } catch (error) {
        console.error('Error al obtener el reporte:', error);
    }

}

const obtenerAlumnosXMaestro = async (request, response) => {

    try {
        const data = await Detalle.findAll({
            include: [
                {
                    model: Alumno,
                    attributes: ['nombres', 'apellidos', 'idalum'],
                },
                {
                    model: Maestro,
                    attributes: ['nombres', 'apellidos', 'idmaestro'],
                },
            ],
            order: [
                [{ model: Alumno }, 'nombres', 'ASC'],
                [{ model: Maestro }, 'nombres', 'ASC'],
            ],
        });

        console.log(data);

        return response.status(200).json({
            data: data
        }).end();

    } catch (error) {
        console.error('Error al obtener el reporte:', error);
    }

}


const obtenerMateriaXMaestro = async (request, response) => {

    try {
        const data = await Detalle.findAll({
            include: [
                {
                    model: Maestro,
                    attributes: ['nombres', 'apellidos', 'idmaestro'],
                },
                {
                    model: Materia,
                    attributes: ['nombres', 'grado'],
                },
            ],
            order: [
                [{ model: Maestro }, 'nombres', 'ASC'],
                [{ model: Materia }, 'nombres', 'ASC'],
            ],
        });

        console.log(data);

        return response.status(200).json({
            data: data
        }).end();

    } catch (error) {
        console.error('Error al obtener el reporte:', error);
    }

}

const obtenerDetalleAlumnoXMateriaXMaestro = async (request, response) => {

    const idDetalle = request.params.idDetalle;
    const detalle = await Detalle.findByPk(idDetalle);

    if(!detalle) {
        return response.status(404).json({}).end({
            mensaje: 'Reporte no encontrado'
        });
    }

    return response.status(200).json({
        data: {
            idcns: detalle.idcns,
            alumno: {
                idalum: detalle.alumno.idalum,
                nombres: detalle.alumno.nombres,
                apellidos: detalle.alumno.apellidos
            }
        }
    }).end();

}

module.exports = {
    obtenerAlumnosXMateria,
    obtenerAlumnosXMaestro,
    obtenerMateriaXMaestro
}

