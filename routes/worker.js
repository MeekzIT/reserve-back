var express = require("express");
var router = express.Router();
const workerController = require("../controllers/worker");
const authMiddleWare = require("../middlewares/adminAuthMiddleware");

router.post("/", workerController.create);
router.post("/destroy", authMiddleWare, workerController.destroy);
router.post("/edit", authMiddleWare, workerController.editWorker);
router.get("/", authMiddleWare, workerController.getWorkers);
router.get("/hour", workerController.getWorkerHours);

module.exports = router;
