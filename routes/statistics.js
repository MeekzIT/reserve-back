var express = require("express")
var router = express.Router()
const statisticsController = require("../controllers/statistics")
const authMiddleWare = require("../middlewares/adminAuthMiddleware")

router.get("/box", statisticsController.getBoxStatistics)
router.get("/box-current", statisticsController.getBoxCurrent)
router.get("/owner", statisticsController.getOwnerStatistics)
router.get("/owner-current", statisticsController.getOwnerCurrent)
router.get("/user", statisticsController.getUserStatistics)
router.get("/user-current", statisticsController.getUserCurrent)

module.exports = router
