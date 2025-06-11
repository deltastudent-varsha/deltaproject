const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js")

const reviewController = require("../controllers/reviews.js");

//Post Route
router.post("/", 
  isLoggedIn,
  validateReview, 
  wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview));

module.exports = router;