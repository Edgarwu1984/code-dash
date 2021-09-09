const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getCourses,
  getCourseById,
  createCourseReview,
  getCoursesByCategory,
  getTopCoursesByRating,
  getCoursesByInstructor,
  getCourseReviewsByUser,
} = require('../controllers/courseControllers');

const router = express.Router();

router.route('/').get(getCourses);
router.route('/reviews/user/:id').get(getCourseReviewsByUser);
router.route('/instructor').get(getCoursesByInstructor);
router.route('/top').get(getTopCoursesByRating);
router.route('/:category').get(getCoursesByCategory);
router.route('/:category/:id').get(getCourseById);
router.route('/:id/reviews').post(protect, createCourseReview);

module.exports = router;
