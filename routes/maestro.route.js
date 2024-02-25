const { Router } = require('express');
const controller = require('../controllers/maestro.controller');

const router = Router();

router.get('/', controller.obtenerMestros);
router.get('/:idMaestro', controller.obtenerMestro);
router.post('/', controller.crearMaestro);
router.patch('/:idMaestro', controller.modificarMaestro);
router.delete('/:idMaestro', controller.eliminarMaestro);


module.exports = router;