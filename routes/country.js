var express = require("express");
var router = express.Router();
const countryController = require("../controllers/country");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/create", authAdminMiddleWare, countryController.create);
router.post("/edit", authAdminMiddleWare, countryController.edit);
router.post("/del", authAdminMiddleWare, countryController.del);
router.get("/", countryController.getAll);

module.exports = router;
