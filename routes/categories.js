var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/category");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/create", authAdminMiddleWare, categoryController.create);
router.post("/edit", authAdminMiddleWare, categoryController.edit);
router.post("/del", authAdminMiddleWare, categoryController.del);
router.get("/", categoryController.getAll);

module.exports = router;
