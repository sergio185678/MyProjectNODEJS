const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const checkRoleAuth = require('../middlewares/roleAuth');
const checkSesionAuth = require('../middlewares/sesionAuth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext);
      cb(null, filename + '-' + Date.now() + ext);
    },
});

const upload = multer({ storage: storage });

router.post('/save_files',checkRoleAuth(["Administrador"]), upload.single('file'), documentController.guardar_archivos);
router.get('/get_all_files_by_user/:user_id',checkSesionAuth, documentController.obtener_archivos);
router.get('/get_url/:id',checkSesionAuth, documentController.obtener_ruta);
router.delete('/file/:id',checkSesionAuth, documentController.eliminar_Archivo);

module.exports = router;