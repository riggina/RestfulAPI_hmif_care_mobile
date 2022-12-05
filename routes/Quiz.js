const express = require("express");
const router = express.Router();

const QuizController = require('../controllers/QuizController');

router.post("/", QuizController.addQuiz);
router.get("/", QuizController.getAllQuiz);
router.get("/:id", QuizController.getQuizById);
router.patch(":id", QuizController.updateQuiz);
router.delete("/:id", QuizController.deleteQuiz);

module.exports = router;