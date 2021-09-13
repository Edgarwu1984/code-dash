const express = require('express');
const reviewRouter = require('./reviewRoutes');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  createCourse,
  getCourses,
  getCourseById,
  getCoursesByCategory,
  getTopCoursesByRating,
  getCoursesByInstructor,
} = require('../controllers/courseControllers');

const router = express.Router();

// Merge courses route to review route
router.use('/:id/reviews', reviewRouter);

router.route('/').get(getCourses).post(protect, isAdmin, createCourse);
router.route('/top-4').get(getTopCoursesByRating);
router.route('/instructors/:id').get(getCoursesByInstructor);
router.route('/:category').get(getCoursesByCategory);
router.route('/:category/:id').get(getCourseById);

module.exports = router;
