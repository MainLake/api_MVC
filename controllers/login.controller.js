const modeloLogin = require('../models/login.model');
const bycript = require('bcrypt');
const saltRounds = 10;

const obtenerUsuarios = async (request, response) => {

    const data = await modeloLogin.findAll();

    const usuarios = data.map(usuario => {
        return usuario.dataValues;
    });

    return response.status(200).json({
        data: usuarios
    }).end();

}

const obtenerUsuario = async (request, response) => {
    const idUsuario = request.params.idUsuario;
    const usuario = await modeloLogin.findByPk(idUsuario);

    if (!usuario) {
        return response.status(404).json({
            mensaje: 'Usuario no encontrado'
        }).end();
    }

    return response.status(200).json({
        data: usuario.dataValues
    }).end();
}

const crearUsuario = async (request, response) => {
    const { usuario, passwrd } = request.body;
    if (!usuario || !passwrd) {
        return response.status(400).json({
            mensaje: 'Faltan datos, asegurate de enviar "usuario" y "passwrd"',
            ejemplo: {
                usuario: "Ejemplo",
                passwrd: "Ejemplo"
            }
        }).end();
    }

    const passwrdHash =  await bycript.hash(passwrd, saltRounds);

    const nuevoUsuario = await modeloLogin.create({usuario:usuario, passwrd:passwrdHash });
    return response.status(201).json({
        data: nuevoUsuario.dataValues
    }).end();

}

const modificarUsuario = async (request, response) => {
    const { usuario, passwrd } = request.body;
    const idUsuario = request.params.idUsuario;

    if(!(usuario || passwrd)){
        return response.status(400).json({
            mensaje: 'Faltan datos, asegurate de enviar "usuario" o "passwrd"',
            ejemplo: {
                usuario: "Ejemplo",
                passwrd: "Ejemplo"
            }
        }).end();
    }

    const user = await modeloLogin.findByPk(idUsuario);

    if(!user){
        return response.status(404).json({
            mensaje: 'Usuario no encontrado'
        }).end();
    }

    const updateUser = await user.update({ usuario, passwrd });

    return response.status(200).json({
        data: updateUser.dataValues
    }).end();

}

const eliminarUsuario = async (request, response) => {
    const idUsuario = request.params.idUsuario;

    const usuario = await modeloLogin.findByPk(idUsuario); 

    if(!usuario){
        return response.status(404).json({
            mensaje: 'Usuario no encontrado'
        }).end();
    }

    await usuario.destroy();

    return response.status(404).json({
        mensaje: 'Usuario eliminado'
    }).end();

}


module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    modificarUsuario,
    eliminarUsuario
}