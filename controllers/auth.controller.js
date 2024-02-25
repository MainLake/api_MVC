require('dotenv').config();
const modeloUsuario = require('../models/login.model');
const jwt = require('jsonwebtoken');
const secretCode = process.env.JWT_SECRET;
const bycript = require('bcrypt');

const auth = async (request, response) => {

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

    const usuarioFind = await modeloUsuario.findOne({ where: { usuario } });
    if (!usuarioFind) {
        return response.status(404).json({
            mensaje: 'Usuario no encontrado'
        }).end();
    }

    const compare = await bycript.compare(passwrd, usuarioFind.dataValues.passwrd);
    if(!compare){
        return response.status(401).json({
            mensaje: 'Usuario no autorizado!!'
        }).end();
    }

    const token = jwt.sign({
        usuario: usuarioFind.dataValues.usuario,
        id: usuarioFind.dataValues.idlog
    }, secretCode);

    return response.status(200).json({
        data: {
            token
        }
    }).end();

}

module.exports = {
    auth
}