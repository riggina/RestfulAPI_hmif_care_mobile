const express = require("express");
const router = express.Router();

const ReviewController = require('../controllers/ReviewControl');

router.get("/", ReviewController.getReview);
router.postt("/", ReviewController.createReview);
router.get("/:id_user", ReviewController.getReviewByUser);

module.exports = router;
