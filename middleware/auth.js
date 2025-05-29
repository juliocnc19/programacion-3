const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    return next();
  }
  res.redirect('/auth/login');
};

const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role.name === 'admin') {
    return next();
  }
  res.status(403).render('error', {
    message: 'Acceso denegado',
    error: { status: 403 }
  });
};

const isGanadero = (req, res, next) => {
  if (req.session.user && req.session.user.role.name === 'ganadero') {
    return next();
  }
  res.status(403).render('error', {
    message: 'Acceso denegado',
    error: { status: 403 }
  });
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isGanadero
}; 