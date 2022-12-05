const express = require("express");

const UserRoutes = require("./User");
const QuizRoutes = require("./Quiz");
const QuestionRoutes = require("./Question");

const router = express.Router();

router.get("/ping", (res) => {
    const ready = {
        status: "Server is Ready"
    };

    res.status(200).send(ready);
})

router.use("/user", UserRoutes);
router.use("/quiz", QuizRoutes);
router.use("/question", QuestionRoutes);

module.exports = router