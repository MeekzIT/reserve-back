var express = require("express");
var router = express.Router();
const ownerController = require("../controllers/owner");
const authMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/create", authMiddleWare, ownerController.create);
router.get("/", authMiddleWare, ownerController.getAll);
router.get("/single", authMiddleWare, ownerController.getSingle);
router.get("/my-owners", authMiddleWare, ownerController.getAllOwnersOfUser);
router.post("/delete-owner", authMiddleWare, ownerController.delateAccount);

module.exports = router;
