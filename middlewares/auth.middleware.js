require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
console.log(JWT_SECRET);

const verifyAuth = (request, response, next) => {

    const token = request.header('Authorization')?.split(' ')[1];

    if(!token) {
        return response.status(401).json({
            mensaje: 'No cuentas con acceso para realizar esta accion!!',
            detalle: 'Falta metodo de autenticacion o token.'
        }).end();
    }

    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        return response.status(401).json({
            mensaje: 'No cuentas con autorizacion para realizar esta accion!!',
            detalle: 'Token no valido.'
        }).end();
    }

}

module.exports = verifyAuth;

