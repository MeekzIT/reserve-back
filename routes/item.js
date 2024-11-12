var express = require("express")
var router = express.Router()
const itemController = require("../controllers/item")
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware")

router.post("/edit", authAdminMiddleWare, itemController.edit)

//modes
router.post("/add-mode", authAdminMiddleWare, itemController.addMode)
router.post("/edit-mode", authAdminMiddleWare, itemController.editItemModes)
router.post("/destroy-mode", authAdminMiddleWare, itemController.destroyMode)
router.get("/mode", authAdminMiddleWare, itemController.getItemModes)
router.get("/box-mode", authAdminMiddleWare, itemController.getBoxModes)

//types
router.post("/add-type", authAdminMiddleWare, itemController.addType)
router.post("/edit-type", authAdminMiddleWare, itemController.editItemType)
router.post("/destroy-type", authAdminMiddleWare, itemController.destroyType)
router.get("/type", authAdminMiddleWare, itemController.getItemType)
//yandex
router.get("/box-type", itemController.getBoxType)

module.exports = router
