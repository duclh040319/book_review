const Book = require("../models/Book");
const User = require('../models/User')
const { multipleMongoToObject } = require("../utils/mongoose");

class AdminController {
  index(req, res) {
    res.render("admin/index", {
      title: "Dashboard-admin",
      layout: "admin",
      admin: req.user.username
    });
  }

  statistic(req, res) {
    res.render("admin/statistic", {
      title: "Statistic",
      layout: "admin",
    });
  }

  bookManage(req, res) {
    Book.find({}).then((data) => {
      res.render("admin/bookManage", {
        title: "Book Manager",
        layout: "admin",
        books: multipleMongoToObject(data),
      })
      
    })
    .catch(err => {
        res.render("admin/bookManage", {
        title: "Book Manager",
        layout: "admin",
        books: ''
      })
    })
  }

  user(req, res) {

    User.find({})
      .then(data => {

        res.render("admin/user", {
          title: "User",
          layout: "admin",
          users: multipleMongoToObject(data)
        });
      })
      .catch(err => {
        res.render("admin/user", {
          title: "User",
          layout: "admin",
          users: ''
        });
      })
    
  }

  review(req, res) {
    res.render("admin/review", {
      title: "Reviews",
      layout: "admin",
    });
  }

  setting(req, res) {
    res.render("admin/setting", {
      title: "Setting",
      layout: "admin",
    });
  }

  redirectIndex(req, res) {
    res.redirect("/admin/dashboard");
  }
}

module.exports = new AdminController();
