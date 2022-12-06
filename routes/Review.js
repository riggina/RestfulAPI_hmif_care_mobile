const express = require("express");
const router = express.Router();

const ReviewController = require('../controllers/ReviewControl');

router.get("/", ReviewController.getAllReview);
router.post("/", ReviewController.createReview);
router.get("/:id_user", ReviewController.getReviewByUser);

module.exports = router;
