const express = require("express");

const UserRoutes = require("./User");
const QuizRoutes = require("./Quiz");
const QuestionRoutes = require("./Question");
const KonselingRoutes = require("../routes/Konseling");

const router = express.Router();

router.get("/ping", (req,res) => {
    res.status(200).send("Welcome to HMIF CARE");
})

router.use("/user", UserRoutes);
router.use("/quiz", QuizRoutes);
router.use("/question", QuestionRoutes);
router.use("/koseling", KonselingRoutes);

module.exports = router