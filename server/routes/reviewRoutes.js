const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getReviews,
  createReview,
  deleteReview,
  getTopReviews,
} = require('../controllers/reviewControllers');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getReviews)
  .post(protect, createReview)
  .delete(protect, deleteReview);

router.route('/top').get(getTopReviews);

module.exports = router;
