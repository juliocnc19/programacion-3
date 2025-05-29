const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');

// Rutas públicas
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/register', authController.showRegister);
router.post('/register', authController.register);

// Ruta protegida (requiere autenticación)
router.get('/logout', isAuthenticated, authController.logout);

module.exports = router; 