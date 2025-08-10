const User = require("../models/User");
const { mongooseToObject } = require("../utils/mongoose");
class HomeController {
  async home(req, res) {
    try {
      const user = await req.user;

      res.render("home", { title: "Home", userData: mongooseToObject(user) });
    } catch {
      res.render("home", { title: "Home" });
    }
  }
}

module.exports = new HomeController();
