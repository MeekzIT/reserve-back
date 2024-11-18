var express = require("express");
var router = express.Router();
const controller = require("../controllers/yandex");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/login", controller.login);
router.post("/logout", controller.logout);

module.exports = router;
