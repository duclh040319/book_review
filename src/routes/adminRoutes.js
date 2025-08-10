const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/dashboard", adminController.index);
router.get("/statistic", adminController.statistic);
router.get("/book-manage", adminController.bookManage);
router.get("/users", adminController.user);
router.get("/reviews", adminController.review);
router.get("/settings", adminController.setting);
router.get("/", adminController.redirectIndex);

module.exports = router;
