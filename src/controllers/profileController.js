const { mongooseToObject } = require("../utils/mongoose");

class ProfileController {
  profile(req, res) {
    const user = req.user;
    res.render("user/profile", { title: "Profile", userData: mongooseToObject(user) });
  }
}

module.exports = new ProfileController()