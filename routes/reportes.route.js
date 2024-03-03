const { Router } = require('express');
const controller = require('../controllers/reportes.controller');

const router = Router();

router.get('/alumnos/materia', controller.obtenerAlumnosXMateria);

module.exports = router;