const express = require('express');
const {
  getInstructors,
  getInstructorById,
} = require('../controllers/instructorControllers');

const router = express.Router();
router.route('/').get(getInstructors);
router.route('/:id').get(getInstructorById);

module.exports = router;
