import { Router } from "express";
const router = Router();
import authController from '../controllers/authController.js'
import {gotoAuth} from '../middlewares/checkAuth.js'
router.post("/register", gotoAuth, authController.register);
router.post("/login", gotoAuth, authController.login);
router.get("/logout", authController.logout);
router.get("/register", gotoAuth, authController.registerForm);
router.get("/login", gotoAuth, authController.loginForm);

export default router
