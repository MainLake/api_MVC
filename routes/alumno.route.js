const { Router } = require('express')
const controller = require('../controllers/alumno.controller');
const verifyAuth = require('../middlewares/auth.middleware');

const router = Router();

router.use(verifyAuth);

router.get('/', controller.obtenerAlumnos);
router.get('/:idAlumno', controller.obtenerAlumno);
router.post('/', controller.crearAlumno);
router.patch('/:idAlumno', controller.modificarAlumno);
router.delete('/:idAlumno', controller.eliminarAlumno);

module.exports = router;