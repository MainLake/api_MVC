const { Router } = require('express')
const controller = require('../controllers/login.controller');

const router = Router();

router.get('/', controller.obtenerUsuarios);
router.get('/:idUsuario', controller.obtenerUsuario);
router.post('/', controller.crearUsuario);
router.patch('/:idUsuario', controller.modificarUsuario);
router.delete('/:idUsuario', controller.eliminarUsuario);

module.exports = router;
