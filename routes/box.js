var express = require("express");
var router = express.Router();
const boxController = require("../controllers/box");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authAdminMiddleWare, boxController.create);
router.post("/edit", authAdminMiddleWare, boxController.edit);
router.post("/destroy", authAdminMiddleWare, boxController.destroy);
router.get("/", authAdminMiddleWare, boxController.getAllBoxesOfOwners);
router.get("/boxes", authAdminMiddleWare, boxController.getAllBoxes);

//yandex
router.get("/yandex/boxes", boxController.getAllBoxesYandex);

// box images
router.get("/image", authAdminMiddleWare, boxController.getBoxImages);

//yandex
router.get("/yandex/image", boxController.getBoxImagesYandex);
router.post("/image", authAdminMiddleWare, boxController.createBoxImage);
router.post(
  "/image-destroy",
  authAdminMiddleWare,
  boxController.destroyBoxImage
);

module.exports = router;
