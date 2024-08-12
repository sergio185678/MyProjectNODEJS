const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');
const checkRoleAuth = require('../middlewares/roleAuth');
const checkSesionAuth = require('../middlewares/sesionAuth');

router.post('/register',checkRoleAuth(["Administrador"]), cargoController.registrar_cargo);
router.get('/cargos',checkSesionAuth, cargoController.obtenercargos);
router.get('/usuarios_by_cargo/:cargo_id',checkSesionAuth, cargoController.obtenerUsuariosPorCargo);
router.get('/cargo/:cargo_id',checkSesionAuth, cargoController.obtener_cargo);

module.exports = router;