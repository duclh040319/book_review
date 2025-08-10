const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { gotoAuth } = require("../middlewares/checkAuth");

router.post("/register", gotoAuth, authController.register);
router.post("/login", gotoAuth, authController.login);
router.get("/logout", authController.logout);
router.get("/register", gotoAuth, authController.registerForm);
router.get("/login", gotoAuth, authController.loginForm);

module.exports = router;
