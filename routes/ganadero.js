const express = require('express');
const router = express.Router();
const ganaderoController = require('../controllers/ganaderoController');
const { isAuthenticated, isGanadero } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configuración de multer para subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Dashboard ganadero
router.get('/dashboard', isAuthenticated, isGanadero, ganaderoController.dashboard);

// Listar hierros del usuario
router.get('/hierros', isAuthenticated, isGanadero, ganaderoController.listIrons);

// Formulario para crear hierro
router.get('/hierros/nuevo', isAuthenticated, isGanadero, ganaderoController.showIronForm);

// Crear hierro (con imagen)
router.post('/hierros/crear', isAuthenticated, isGanadero, upload.single('symbolImage'), ganaderoController.createIron);

module.exports = router;
