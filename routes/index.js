const express = require("express");

const UserRoutes = require("./User");

const router = express.Router();

router.get("/ping", (res) => {
    const ready = {
        status: "Server is Ready"
    };

    res.status(200).send(ready);
})

router.use("/user", UserRoutes);

module.exports = router