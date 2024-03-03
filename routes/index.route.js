const { Router } = require('express')
const routerAlumnos = require('./alumno.route');
const routerMaestros = require('./maestro.route');
const routerMaterias = require('./materia.route');
const routerLogin = require('./login.route');
const routerAuth = require('./auth.route');
const routerDetalle = require('./detalle.route');
const routerReportes = require('./reportes.route');

const router = Router();

const initMainRouter = (app) => {

    router.use('/alumnos', routerAlumnos);
    router.use('/maestros', routerMaestros);
    router.use('/materias', routerMaterias);
    router.use('/login', routerLogin);
    router.use('/auth', routerAuth);
    router.use('/detalle', routerDetalle);
    router.use('/reportes', routerReportes);

    app.use('/api/v1', router);
}

module.exports = initMainRouter;