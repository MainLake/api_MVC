const { Router } = require('express')
const controller = require('../controllers/login.controller');
const verifyAuth = require('../middlewares/auth.middleware');

const router = Router();

// router.use(verifyAuth);

router.get('/', verifyAuth, controller.obtenerUsuarios);
router.get('/:idUsuario', verifyAuth, controller.obtenerUsuario);
router.post('/', controller.crearUsuario);
router.patch('/:idUsuario', verifyAuth, controller.modificarUsuario);
router.delete('/:idUsuario', verifyAuth, controller.eliminarUsuario);

module.exports = router;
