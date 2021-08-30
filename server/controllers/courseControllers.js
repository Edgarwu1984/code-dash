const Course = require('../models/courseModel');

// @description Get All Courses
// @route GET /api/courses
// @access Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      'instructor',
      'firstName lastName'
    );
    res.status(200).send(courses);
  } catch (error) {
    res.status(404).send({ message: `${error.reason}` });
  }
};

// @description Get Course by ID
// @route GET /api/courses/:id
// @access Public
const getCourseById = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id).populate(
      'instructor',
      'firstName lastName'
    );

    if (course) {
      res.status(200).send(course);
    } else {
      res.status(404).send({ message: 'Can not found course.' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error.reason}` });
  }
};

module.exports = { getCourses, getCourseById };
