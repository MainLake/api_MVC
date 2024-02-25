const { Router } = require('express');
const controller = require('../controllers/materia.controller');

const router = Router();

router.get('/', controller.obtenerMaterias);
router.get('/:idMateria', controller.obtenerMateria);
router.post('/', controller.crearMateria);
router.patch('/:idMateria', controller.modificarMateria);
router.delete('/:idMateria', controller.eliminarMateria);

module.exports = router;