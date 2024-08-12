const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioController');
const checkRoleAuth = require('../middlewares/roleAuth');
const checkSesionAuth = require('../middlewares/sesionAuth');
const getusertoken = require('../middlewares/getuser_token');

router.put('/usuario/:id',checkRoleAuth(["Administrador"]), userController.editar_usuario);
router.delete('/usuario/:id',checkRoleAuth(["Administrador"]), userController.eliminar_usuario);
router.get('/usuariospaginacion',checkSesionAuth, userController.obtenerUsuariosPaginados);
router.get('/usuario/:id',checkSesionAuth, userController.obtener_usuario);
router.get('/usuarios',checkSesionAuth, userController.obtener_usuarios);
router.get('/user_by_jwt',checkSesionAuth,getusertoken);

module.exports = router;