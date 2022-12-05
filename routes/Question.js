const express = require("express");
const router = express.Router();

const QuestionController = require('../controllers/QuestionController')

router.get("/", QuestionController.getAllQuestion);
router.post("/", QuestionController.createQuestion);
router.delete("/:id", QuestionController.deleteQuestion);

module.exports = router;