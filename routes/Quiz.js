const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")

const QuizController = require('../controllers/QuizController');
const ResultController = require('../controllers/ResultController')

router.get("/result", ResultController.getAllResult);
router.get("/result/:id", ResultController.getByIdResult);
router.post("/postResult", ResultController.createResult);
router.post("/", QuizController.addQuiz);
router.get("/", QuizController.getAllQuiz);
router.get("/:id", QuizController.getQuizById);
router.patch(":id", QuizController.updateQuiz);
router.delete("/:id", QuizController.deleteQuiz);
router.get("/result", ResultController.getAllResult);
router.post("/postResult", ResultController.createResult);

module.exports = router;