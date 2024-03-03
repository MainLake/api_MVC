const modeloDetalle = require('../models/detalle.model');

const modeloAlumno = require('../models/alumno.model');
const modeloMateria = require('../models/materia.model');
const modeloMaestro = require('../models/maestro.model');
const { request } = require('express');

const obtenerDetalles = async (request, response) => {

    const data = await modeloDetalle.findAll();

    const detalles = data.map(detalle => {
        return detalle.dataValues;
    });

    return response.status(200).json({
        data: detalles
    }).end();
}

const obtenerDetalle = async (request, response) => {
    const { idDetalle } = request.params

    const detalle = await modeloDetalle.findByPk(idDetalle);

    if(!detalle) {
        return response.status(404).json({
            mensaje: 'Detalle no encontrado'
        }).end();
    }

    return response.status(200).json({
        data: detalle.dataValues
    }).end();

}

const crearDetalle = async (request, response) => {

    const {alumno, materia, maestro} = request.body;

    if(!alumno || !materia || !maestro) {
        return response.status(404).json({
            mensaje: 'Faltan datos, asegurate de enviar: alumno, materia y maestro',
            ejemplo: {
                alumno: 1,
                materia: 1,
                maestro: 1
            }
        }).end();
    }

    const alumnoData = await modeloAlumno.findByPk(alumno);
    const materiaData = await modeloMateria.findByPk(materia);
    const maestroData = await modeloMaestro.findByPk(maestro);

    if(!alumnoData || !materiaData || !maestroData) {

        const data = {
            alumno: !alumnoData ? 'no existe' : 'existe',
            materia: !materiaData ? 'no existe' : 'existe',
            maestro: !maestroData ? 'no existe' : 'existe'
        }

        return response.status(404).json({
            mensaje: 'Alguna de las entidades que mandaste no existe en la base de datos, asegurate de enviar entidades que existan en la BD.',
            detalle: data
        }).end();
    }

    const data = await modeloDetalle.create({
        idalum: alumno,
        idmat: materia,
        idmaes: maestro
    }) ;

    return response.status(201).json({
        data: data.dataValues
    }).end();

}

const modificarDetalle = async (request, response) => {
    const { idDetalle } = request.params;
    const {alumno, materia, maestro} = request.body;

    if(!(alumno || materia || maestro)) {
        return response.status(404).json({
            mensaje: 'No mandaste datos para modificar, asegurate de enviar: alumno, materia o maestro'
        }).end();
    }

    const detalle = await modeloDetalle.findByPk(idDetalle);

    if(!detalle) {
        return response.status(404).json({
            mensaje: 'El detalle que intentas modificar no existe'
        }).end();
    }

    if(alumno) {
        const alumnoData = await modeloAlumno.findByPk(alumno);
        if(!alumnoData) {
            return response.status(404).json({
                mensaje: 'El alumno que intentas asignar no existe'
            }).end();
        }
    }

    if(materia) {
        const materiaData = await modeloMateria.findByPk(materia);
        if(!materiaData) {
            return response.status(404).json({
                mensaje: 'La materia que intentas asignar no existe'
            }).end();
        }
    }

    if(maestro) {
        const maestroData = await modeloMaestro.findByPk(maestro);
        if(!maestroData) {
            return response.status(404).json({
                mensaje: 'El maestro que intentas asignar no existe'
            }).end();
        }
    }

    const data = await detalle.update({
        idalum: alumno || detalle.idalum,
        idmat: materia || detalle.idmat,
        idmaes: maestro || detalle.idmaes
    });

    return response.status(200).json({
        data: data.dataValues
    }).end();

}


const eliminarDetalle = async (request, response) => {
    const { idDetalle } = request.params;

    const detalle = await modeloDetalle.findByPk(idDetalle);

    if(!detalle) {
        return response.status(404).json({
            mensaje: 'El detalle que intentas eliminar no existe'
        }).end();
    }

    await detalle.destroy();

    return response.status(200).json({
        mensaje: 'Detalle eliminado'
    }).end();
}


module.exports = {
    obtenerDetalles,
    obtenerDetalle,
    crearDetalle,
    modificarDetalle,
    eliminarDetalle
}