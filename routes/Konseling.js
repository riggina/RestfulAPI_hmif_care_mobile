const express = require("express");
const router = express.Router();

const KonselingController = require('../controllers/KonselingController')

router.get("/", KonselingController.getAllKonseling);
router.post("/", KonselingController.createKonseling);
router.get("/:id_user", KonselingController.getKonselingByUserID);


module.exports = router;