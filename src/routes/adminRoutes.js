import { Router } from "express";
const router = Router()
import adminController from '../controllers/adminController.js'

router.get("/dashboard", adminController.index);
router.get("/statistic", adminController.statistic);
router.get("/book-manage", adminController.bookManage);
router.get("/users", adminController.user);
router.get("/reviews/:id", adminController.getReview);
router.get("/reviews", adminController.review);
router.get("/settings", adminController.setting);
router.get("/book/:id", adminController.getBook);
router.get("/", adminController.redirectIndex);

export default router