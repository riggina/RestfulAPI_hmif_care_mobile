const express = require("express");
const auth = require("../middleware/auth");

const UserRoutes = require("./User");
const QuizRoutes = require("./Quiz");
const QuestionRoutes = require("./Question");
const KonselingRoutes = require("../routes/Konseling");
const ReviewRoutes = require("./Review");

const router = express.Router();

router.get("/ping", (req,res) => {
    res.status(200).send("Welcome to HMIF CARE");


router.use("/user", UserRoutes);
router.use("/quiz",auth, QuizRoutes);
router.use("/question",auth, QuestionRoutes);
router.use("/konseling",auth, KonselingRoutes);
router.use("/review",auth, ReviewRoutes);
 

module.exports = router;