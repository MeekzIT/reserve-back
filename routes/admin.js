var express = require("express");
var router = express.Router();
const adminController = require("../controllers/admin");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post(
  "/changeSettings",
  authAdminMiddleWare,
  adminController.changeSettings
);
router.post(
  "/changePassword",
  authAdminMiddleWare,
  adminController.changePassword
);

router.post("/create", authAdminMiddleWare, adminController.create);
router.post("/destroy", authAdminMiddleWare, adminController.destroyAdmin);
router.get("/", authAdminMiddleWare, adminController.getAdmins);

module.exports = router;
