const { Router } = require('express');
const controller = require('../controllers/auth.controller');

const router = Router();

router.post('/', controller.auth);

module.exports = router;