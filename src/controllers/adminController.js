import { request, response } from "express";

import Book from "../models/Book.js";
import User from "../models/User.js";
import { multipleMongoToObject } from "../utils/mongoose.js";

class AdminController {
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  index(req, res) {
    res.render("admin/index", {
      title: "Dashboard-admin",
      layout: "admin",
      admin: req.user.username,
    });
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  statistic(req, res) {
    res.render("admin/statistic", {
      title: "Statistic",
      layout: "admin",
    });
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  bookManage(req, res) {
    Book.find({})
      .then((data) => {
        res.render("admin/bookManage", {
          title: "Book Manager",
          layout: "admin",
          books: multipleMongoToObject(data),
        });
      })
      .catch((err) => {
        res.render("admin/bookManage", {
          title: "Book Manager",
          layout: "admin",
          books: "",
        });
      });
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  user(req, res) {
    User.find({})
      .then((data) => {
        res.render("admin/user", {
          title: "User",
          layout: "admin",
          users: multipleMongoToObject(data),
        });
      })
      .catch((err) => {
        res.render("admin/user", {
          title: "User",
          layout: "admin",
          users: "",
        });
      });
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  review(req, res) {
    res.render("admin/review", {
      title: "Reviews",
      layout: "admin",
    });
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  setting(req, res) {
    res.render("admin/setting", {
      title: "Setting",
      layout: "admin",
    });
  }
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  redirectIndex(req, res) {
    res.redirect("/admin/dashboard");
  }
}

export default new AdminController();
