const User = require("../models/User");
const passport = require("passport");

class AuthController {
  registerForm(req, res) {
    res.render("auth/register", { title: "Register" });
  }

  loginForm(req, res) {
    
    res.render("auth/login", { title: "Login" });
  }

  register(req, res) {
    const newUser = new User(req.body);
    newUser
      .save()
      .then(() => res.status(200).redirect("/api/v1/auth/login"))
      .catch((err) => res.status(400).json({ err }));
  }

  login(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/api/v1/auth/login",
      failureMessage: "account invalid",
    })(req, res, next);
  }

  async logout(req, res, next) {
    // Xóa session (nếu sử dụng session)
    await req.session.destroy(function (err) {
      if (err) next();
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  }
}

module.exports = new AuthController();
