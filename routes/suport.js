var express = require("express");
var router = express.Router();
const suportController = require("../controllers/suport");
const authAdminMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", authAdminMiddleWare, suportController.createQuestion);
router.post("/answer", authAdminMiddleWare, suportController.answerQuestion);
router.post("/destroy", authAdminMiddleWare, suportController.destroyQuestion);
router.get("/", authAdminMiddleWare, suportController.getUserHistory);
router.get(
  "/active-questions",
  authAdminMiddleWare,
  suportController.getAdminQuestion
);
router.get(
  "/archive-questions",
  authAdminMiddleWare,
  suportController.getAdminHistory
);

module.exports = router;
