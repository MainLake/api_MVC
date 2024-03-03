const { Router } = require('express');
const controller = require('../controllers/materia.controller');
const verifyAuth = require('../middlewares/auth.middleware');

const router = Router();

router.use(verifyAuth);

router.get('/', controller.obtenerMaterias);
router.get('/:idMateria', controller.obtenerMateria);
router.post('/', controller.crearMateria);
router.patch('/:idMateria', controller.modificarMateria);
router.delete('/:idMateria', controller.eliminarMateria);

module.exports = router;