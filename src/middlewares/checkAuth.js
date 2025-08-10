const isLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/api/v1/auth/login");
  }

  next();
};

const isAdmin = (req, res, next) => {
  const role = req.user.role

  if (role !== 'admin') {
    return res.status(404).render('404')
  }
  next()
  
}

const gotoAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

module.exports = { isLogin, gotoAuth, isAdmin };
