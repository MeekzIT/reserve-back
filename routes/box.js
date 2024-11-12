var express = require("express");
var router = express.Router();
const boxController = require("../controllers/box");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authAdminMiddleWare, boxController.create);
router.post("/edit", authAdminMiddleWare, boxController.edit);
router.post("/destroy", authAdminMiddleWare, boxController.destroy);
router.get("/", authAdminMiddleWare, boxController.getAllBoxesOfOwners);
//yandex
router.get("/boxes", boxController.getAllBoxes);

// box images

//yandex
router.get("/image", boxController.getBoxImages);
router.post("/image", authAdminMiddleWare, boxController.createBoxImage);
router.post(
  "/image-destroy",
  authAdminMiddleWare,
  boxController.destroyBoxImage
);

module.exports = router;
