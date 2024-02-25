const modeloMateria = require('../models/materia.model');

const obtenerMaterias = async (request, response) => {
    const data = await modeloMateria.findAll();

    const materias = data.map(materia => {
        return materia.dataValues
    });

    return response.status(200).json({
        data: materias
    }).end();
}

const obtenerMateria = async (request, response) => {
    const idMateria = request.params.idMateria;
    const materia = await modeloMateria.findByPk(idMateria);

    if (!materia) {
        return response.status(404).json({
            mensaje: "Materia no encontrada!!"
        }).end();
    }

    return response.status(200).json({
        data: materia.dataValues
    }).end();
}

const crearMateria = async (request, response) => {

    const { nombres, grado } = request.body;

    if (!nombres || !grado) {
        return response.status(400).json({
            mensaje: "Faltan datos, asegurate de enviar 'nombres' y 'grado",
            ejemplo: {
                nombres: "Ejemplo",
                grado: "Ejemplos"
            }
        }).end();
    }

    const materia = await modeloMateria.create({ nombres, grado });
    console.log(materia);

    return response.status(201).json({
        data: materia.dataValues
    }).end();

}

const modificarMateria = async (request, response) => {
    const { nombres, grado } = request.body;
    const idMateria = request.params.idMateria;

    if (!(nombres || grado)) {
        return response.status(400).json({
            mensaje: "Faltan datos, asegurate de enviar 'nombres' o 'apellidos'",
            ejemplo: {
                nombres: "Ejemplo",
                apellidos: "Ejemplos"
            }
        }).end();
    }

    const materia = await modeloMateria.findByPk(idMateria); 

    if(!materia) {
        return response.status(404).json({
            mensaje: "Materia no encontrada!!"
        }).end();
    }

    const updateMateria = await materia.update({nombres, grado});
    return response.status(202).json({
        data: updateMateria.dataValues
    }).end();

}

const eliminarMateria = async (request, response) => {
    const idMateria = request.params.idMateria;
    const materia = await modeloMateria.findByPk(idMateria);

    if(!materia) {
        return response.status(404).json({
            mensaje: "Materia no encontrada!!"
        }).end();
    }

    materia.destroy();
    return response.status(404).json({
        mensaje: "Materia eliminada" 
    }).end();
}

module.exports = {
    obtenerMaterias,
    obtenerMateria,
    crearMateria,
    modificarMateria,
    eliminarMateria
}