const express = require("express");
const router = express.Router();

const UserController = require('../controllers/UserController');

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/:nim", UserController.loginUserInfo);

module.exports = router;