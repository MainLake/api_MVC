const { Router } = require('express');
const controller = require('../controllers/detalle.controller');
const verifyAuth = require('../middlewares/auth.middleware');

const router = Router();

router.use(verifyAuth);

router.get('/', controller.obtenerDetalles);
router.get('/:idDetalle', controller.obtenerDetalle);
router.post('/', controller.crearDetalle);
router.patch('/:idDetalle', controller.modificarDetalle);
router.delete('/:idDetalle', controller.eliminarDetalle);


module.exports = router;