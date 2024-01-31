var express = require("express");
var router = express.Router();
const typeController = require("../controllers/type");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/create", authAdminMiddleWare, typeController.create);
router.post("/edit", authAdminMiddleWare, typeController.edit);
router.post("/del", authAdminMiddleWare, typeController.del);
router.get("/", typeController.getAll);

module.exports = router;
