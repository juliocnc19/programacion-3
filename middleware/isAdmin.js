function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role && req.session.user.role.name === 'admin') {
    return next();
  }
  return res.redirect('/auth/login');
}

module.exports = isAdmin;
