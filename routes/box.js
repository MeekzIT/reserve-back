var express = require("express");
var router = express.Router();
const boxController = require("../controllers/box");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authAdminMiddleWare, boxController.create);
router.post("/edit", authAdminMiddleWare, boxController.edit);
router.post("/destroy", authAdminMiddleWare, boxController.destroy);
router.get("/", authAdminMiddleWare, boxController.getAllBoxesOfOwners);
router.get("/boxes", authAdminMiddleWare, boxController.getAllBoxes);

module.exports = router;
