import { request, response } from "express";

import User from "../models/User.js";
import passport from "passport";

class AuthController {
  /**
   *
   * @param {request} req
   * @param response res
   */
  registerForm(req, res) {
    res.render("auth/register", { title: "Register" });
  }
  /**
   *
   * @param {request} req
   * @param response res
   */
  loginForm(req, res) {
    res.render("auth/login", { title: "Login" });
  }
  /**
   *
   * @param {request} req
   * @param response res
   */
  register(req, res) {
    const newUser = new User(req.body);
    newUser
      .save()
      .then(() => res.status(200).redirect("/api/v1/auth/login"))
      .catch((err) => res.status(400).json({ err }));
  }
  /**
   *
   * @param {request} req
   * @param response res
   */
  login(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/api/v1/auth/login",
      failureMessage: "account invalid",
    })(req, res, next);
  }
  /**
   *
   * @param {request} req
   * @param response res
   */
   logout(req, res, next) {
    // Xóa session (nếu sử dụng session)
     req.session.destroy(function (err) {
      if (err) next();
      res.clearCookie("connect.sid");
      res.redirect("/");
    });
  }
}

export default new AuthController();
