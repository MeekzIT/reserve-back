var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authAdminMiddleWare, orderController.create);
router.post("/destroy", orderController.destroyOrder);
router.get(
  "/order-worker",
  authAdminMiddleWare,
  orderController.getOrdersOfWorker
);

module.exports = router;
