import { request, response } from "express";

import { mongooseToObject } from "../utils/mongoose.js";

class ProfileController {
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  profile(req, res) {
    const user = req.user;
    res.render("user/profile", {
      title: "Profile",
      userData: mongooseToObject(user),
      layout: "main",
    });
  }
}

export default new ProfileController();
