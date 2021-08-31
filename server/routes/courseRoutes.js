const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getCourses,
  getCourseById,
  createCourseReview,
} = require('../controllers/courseControllers');

const router = express.Router();

router.route('/').get(getCourses);
router.route('/:id').get(getCourseById);
router.route('/:id/reviews').post(protect, createCourseReview);

module.exports = router;