const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkRoleAuth = require('../middlewares/roleAuth');
const checkSesionAuth = require('../middlewares/sesionAuth');
const getUserToken = require('../middlewares/getuser_token');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/validar_token', checkSesionAuth, authController.validar_token);
router.get('/info_user_jwt', getUserToken);

module.exports = router;