import { request, response } from "express";
import { mongooseToObject } from "../utils/mongoose.js";
class HomeController {
  /**
   *
   * @param {request} req
   * @param {response} res
   */
  async home(req, res) {
    try {
      const user = req.user;

      res.render("home", {
        title: "Home",
        userData: mongooseToObject(user),
        layout: "main",
      });
    } catch {
      res.render("home", { title: "Home", layout: "main" });
    }
  }
}

export default new HomeController();
