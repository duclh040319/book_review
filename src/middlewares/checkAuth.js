import { request, response } from "express";
/**
 *
 * @param {request} req
 * @param {response} res
 */
const isLogin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/api/v1/auth/login");
  }

  next();
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
const isAdmin = (req, res, next) => {
  const role = req.user.role;

  if (role !== "admin") {
    return res.status(404).render("404");
  }
  next();
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
const gotoAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
};

export {isAdmin, isLogin, gotoAuth}