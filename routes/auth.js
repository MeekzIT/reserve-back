var express = require("express");
var router = express.Router();
const authController = require("../controllers/auth");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/login", authController.login);
router.post("/logout", authAdminMiddleWare, authController.logout);
router.get("/me", authAdminMiddleWare, authController.getMe);
router.post("/reset", authAdminMiddleWare, authController.resetPassword);

module.exports = router;
