const modeloMaestro = require('../models/maestro.model');


const obtenerMestros = async (request, response) => {

    const data = await modeloMaestro.findAll();
    const maestros = data.map(maestro => {
        return maestro.dataValues;
    });

    return response.status(200).json({
        data: maestros
    }).end();

}

const obtenerMestro = async (request, response) => {
    const idMaestro = request.params.idMaestro;
    const maestro = await modeloMaestro.findByPk(idMaestro);

    if (!maestro) {
        return response.status(404).json({
            mensaje: 'Maestro no encontrado'
        }).end();
    }

    return response.status(200).json({
        data: maestro.dataValues
    }).end();

}

const crearMaestro = async (request, response) => {

    const { nombres, apellidos } = request.body;

    if (!nombres || !apellidos) {
        return response.status(400).json({
            mensaje: "Faltan datos, asegurate de enviar 'nombres' y 'apellidos",
            ejemplo: {
                nombres: "Ejemplo",
                apellidos: "Ejemplos"
            }
        }).end();
    }

    const maestro = await modeloMaestro.create({ nombres, apellidos });

    console.log(maestro);

    return response.status(201).json({
        data: maestro.dataValues
    }).end();

}

const modificarMaestro = async (request, response) => {
    const { nombres, apellidos } = request.body;
    const idMaestro = request.params.idMaestro;

    if (!(nombres || apellidos)) {
        return response.status(400).json({
            mensaje: "Faltan datos, asegurate de enviar 'nombres' o 'apellidos'",
            ejemplo: {
                nombres: "Ejemplo",
                apellidos: "Ejemplos"
            }
        }).end();
    }

    const maestro = await modeloMaestro.findByPk(idMaestro);

    if(!maestro) {
        return response.status(404).json({
            mensaje: 'Maestro no encontrado!!'
        }).end();
    }

    const updateMaestro = await maestro.update({nombres, apellidos});

    return response.status(202).json({
        data: updateMaestro.dataValues
    }).end();

}

const eliminarMaestro = async (request, response) => {
    const idMaestro = request.params.idMaestro;
    const maestro = await modeloMaestro.findByPk(idMaestro);

    if(!maestro) {
        return response.status(404).json({
            mensaje: "Maestro no encontrado"
        }).end();
    }

    maestro.destroy();

    return response.status(404).json({
        mensaje: "Maestro eliminado"
    }).end();
}

module.exports = {
    obtenerMestros,
    obtenerMestro,
    crearMaestro,
    modificarMaestro,
    eliminarMaestro
}