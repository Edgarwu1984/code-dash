const express = require('express');
const {
  getCourses,
  getCourseById,
} = require('../controllers/courseControllers');

const router = express.Router();

router.route('/').get(getCourses);
router.route('/:id').get(getCourseById);

module.exports = router;
