var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");
const authMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/sign-up", userController.signUp);
router.get("/me", authMiddleWare, userController.getMe);
router.post("/sign-in", userController.signIn);
router.post("/logout", authMiddleWare, userController.logout);

module.exports = router;
