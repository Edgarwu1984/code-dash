const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getCourses,
  getCourseById,
  createCourseReview,
  getCoursesByCategory,
} = require('../controllers/courseControllers');

const router = express.Router();

router.route('/').get(getCourses);
router.route('/:category').get(getCoursesByCategory);
router.route('/:category/:id').get(getCourseById);
router.route('/:id/reviews').post(protect, createCourseReview);

module.exports = router;
