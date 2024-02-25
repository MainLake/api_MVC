const modeloAlumno = require('../models/alumno.model');

const obtenerAlumnos = async(request, response) => {
    const data = await modeloAlumno.findAll();
    const alumnos = data.map(alumno => {
        return alumno.dataValues
    });
    console.log(alumnos)
    response.status(200).json({
        data: alumnos
    }).end()
}

const obtenerAlumno = async (request, response) => {
    const idAlumno = request.params.idAlumno;
    const data = await modeloAlumno.findByPk(idAlumno);
    if(!data) {
            return response.status(404).json({
            mensaje: 'Alumno no encontrado'
        }).end();
    }

    const alumno = data.dataValues; 
    return response.status(200).json({
        data: alumno
    }).end();
}

const crearAlumno = async(request, response) => {

    const data = request.body;

    if(!data.nombres || !data.apellidos) {
        return response.status(400).json({
            mensaje: "Faltan datos, asegurate de enviar 'nombres' y 'apellidos'",
            ejemplo: {
                nombres: "Ejemplo",
                apellidos: "Ejemplos"
            }
        }).end()
    }

    const respuestaBD = await modeloAlumno.create(data);
    const alumno = respuestaBD.dataValues;

    return response.status(201).json({
        data: alumno
    }).end()
}

const modificarAlumno = async (request, response) => {
    const data = request.body;
    const idAlumno = request.params.idAlumno;

    if(!(data.nombres || data.apellidos)) {
        return response.status(400).json({
            mensaje: "Faltan datos, asegurate de enviar 'nombres' o 'apellidos'",
            ejemplo: {
                nombres: "Ejemplo",
                apellidos: "Ejemplos"
            }
        }).end()
    }

    const alumno = await modeloAlumno.findByPk(idAlumno);
    console.log(alumno)

    if(!alumno) {
        return response.status(404).json({
            mensaje: "No se encontro el id del alumno"
        }).end();
    }

    const dataUpdate = await alumno.update(data);

    return response.status(202).json(dataUpdate.dataValues).end

}

const eliminarAlumno = async (request, response) => {
    const idAlumno = request.params.idAlumno;
    const alumno = await modeloAlumno.findByPk(idAlumno);
    
    if(!alumno) {
        return response.status(404).json({
            mensaje: "Alumno no encontrado!!"
        }).end();
    }

    await alumno.destroy();
    return response.status(404).json({
        mensaje: "El alumno ha sido eliminado"
    }).end();

} 

module.exports = {
    obtenerAlumnos,
    obtenerAlumno,
    crearAlumno,
    modificarAlumno,
    eliminarAlumno
}