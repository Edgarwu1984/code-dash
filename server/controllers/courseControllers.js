const Course = require('../models/courseModel');
const asyncHandler = require('../utils/asyncHandler');

// @description Create Course
// @route POST /api/courses
// @access Private/Admin

const createCourse = asyncHandler(async (req, res) => {
  const course = req.body;

  if (course) {
    await Course.create(course);
    res.status(201).send('New course added.');
  } else {
    res.status(400);
    throw new Error('Invalid input course data.');
  }
});

// @description Get All Courses
// @route GET /api/courses
// @access Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  res.status(200).json({
    status: 'Success',
    results: courses.length,
    data: courses,
  });
});

// @description Get Course by Category
// @route GET /api/courses/:category
// @access Public
const getCoursesByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const courses = await Course.find().where('category').equals(category);
  res
    .status(200)
    .json({ status: 'Success', results: courses.length, data: courses });
});

// @description Get Course by ID
// @route GET /api/courses/:category/:id
// @access Public
const getCourseById = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const id = req.params.id;
  const course = await Course.findOne({
    _id: `${id}`,
    category: `${category}`,
  }).populate('reviews');

  if (course) {
    res.status(200).json({
      status: 'Success',
      data: course,
    });
  } else {
    res.status(404);
    throw new Error('Can not found course.');
  }
});

// @description Get Courses by Instructor's id
// @route GET /api/courses/instructors/:id
// @access Public
const getCoursesByInstructor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const courses = await Course.find({
    instructor: { _id: id },
  });

  res.status(200).json({
    status: 'Success',
    results: courses.length,
    data: courses,
  });
});

// @description Get Top 4 Course by Rating
// @route GET /api/courses/top
// @access Public
const getTopCoursesByRating = asyncHandler(async (req, res) => {
  const courses = await Course.find({})
    .where('reviews.rating')
    .gte(4.8)
    .limit(4);

  res.status(200).json({
    status: 'Success',
    results: courses.length,
    data: courses,
  });
});

module.exports = {
  createCourse,
  getCourses,
  getCoursesByCategory,
  getCourseById,
  getCoursesByInstructor,
  getTopCoursesByRating,
};
