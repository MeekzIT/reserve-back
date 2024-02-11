var express = require("express");
var router = express.Router();
const activeOrdersController = require("../controllers/activeOrders");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.get("/", activeOrdersController.getAll);
router.post("/", activeOrdersController.destroyAll);
router.get(
  "/reserves",
  authAdminMiddleWare,
  activeOrdersController.getUserActives
);
router.post("/activate", authAdminMiddleWare,activeOrdersController.activatePoint);
module.exports = router;
