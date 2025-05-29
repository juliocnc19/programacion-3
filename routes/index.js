const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Si hay una sesión activa, redirigir al dashboard correspondiente
  if (req.session.user) {
    if (req.session.user.role.name === 'admin') {
      return res.redirect('/admin/dashboard');
    } else {
      return res.redirect('/ganadero/dashboard');
    }
  }
  
  // Si no hay sesión, redirigir al login
  res.redirect('/auth/login');
});

module.exports = router;
