var express = require("express");
var router = express.Router();
const orderController = require("../controllers/order");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authAdminMiddleWare, orderController.create);
router.post(
  "/registrate",
  authAdminMiddleWare,
  orderController.registratedOrder
);
router.post("/destroy", orderController.destroyOrder);
router.get(
  "/user-orders",
  authAdminMiddleWare,
  orderController.getOrdersOfUser
);
router.get("/user-order", authAdminMiddleWare, orderController.getOrderOfUser);
router.get(
  "/order-worker",
  authAdminMiddleWare,
  orderController.getOrdersOfWorker
);
router.post("/yandex/order", orderController.yandexOrder);

module.exports = router;
