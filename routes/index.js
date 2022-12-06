const express = require("express");
const auth = require("../middleware/auth");

const UserRoutes = require("./User");
const QuizRoutes = require("./Quiz");
const QuestionRoutes = require("./Question");
const ReviewRoutes = require("./Review");

const router = express.Router();

router.get("/ping", (req, res) => {
    const ready = {
        status: "Server is Ready"
    };

    res.status(200).send(ready);
})

router.use("/user", UserRoutes);
router.use("/quiz",auth, QuizRoutes);
router.use("/question",auth, QuestionRoutes);
router.use("/review",auth, ReviewRoutes);
 
module.exports = router