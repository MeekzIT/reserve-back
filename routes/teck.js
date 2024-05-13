var express = require("express");
var router = express.Router();
const techController = require("../controllers/tech");
const authMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/create", techController.create);
router.post("/edit", techController.edit)
router.post("/destroy", techController.destroy)
router.get("/", techController.getAll);
router.get("/single", authMiddleWare, techController.getSingle);

module.exports = router;
