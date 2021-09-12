const Course = require('../models/courseModel');
const asyncHandler = require('../utils/asyncHandler');

// @description Get All Courses
// @route GET /api/courses
// @access Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find()
    .populate({
      path: 'instructor',
      select: 'firstName lastName',
    })
    .populate({ path: 'reviews reviews.user', select: 'username photo' });

  res.status(200).json({
    status: 'Success',
    results: courses.length,
    data: courses,
  });
});

// @description Get All Courses
// @route GET /api/courses/reviews/user/:id
// @access Public
const getCourseReviewsByUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const courses = await Course.find({
    'reviews.user': `${userId}`,
  })
    .select('name')
    .select('category')
    .select('image')
    .select('reviews'); // select() => only return certain filed

  res.status(200).json({
    status: 'Success',
    results: courses.length,
    data: courses,
  });
});

// @description Get 3 Top Reviews
// @route GET /api/courses/reviews/top
// @access Public
const getTopCourseReviews = asyncHandler(async (req, res) => {
  const courses = await Course.find()
    .select('reviews.user')
    .select('reviews.rating')
    .select('reviews.comment')
    .sort({ rating: -1 })
    .limit(3)
    .populate({ path: 'reviews.user', select: 'username photo' });

  res.status(200).json({
    status: 'Success',
    results: courses.length,
    data: courses,
  });
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
  })
    .populate({
      path: 'instructor',
      select: 'firstName lastName',
    })
    .populate({ path: 'reviews reviews.user', select: 'username photo' });

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

// @description Get Course by Category
// @route GET /api/courses/:category
// @access Public
const getCoursesByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const courses = await Course.find({ category: `${category}` }).populate(
    'instructor',
    'firstName lastName'
  );

  res
    .status(200)
    .json({ status: 'Success', results: courses.length, data: courses });
});

// @description Get Top 4 Course by Rating
// @route GET /api/courses/top
// @access Public
const getTopCoursesByRating = asyncHandler(async (req, res) => {
  const courses = await Course.find({})
    .sort({ rating: -1 })
    .limit(4)
    .populate('instructor', 'firstName lastName');

  res.status(200).json({
    status: 'Success',
    results: courses.length,
    data: courses,
  });
});

// @description Get Courses by Instructor's id
// @route GET /api/courses/instructors/:id
// @access Public
const getCoursesByInstructor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const courses = await Course.find({
    instructor: { _id: id },
  }).populate('instructor', 'firstName lastName');

  res.status(200).json({
    status: 'Success',
    results: courses.length,
    data: courses,
  });
});

// @description Create review
// @route GET /api/courses/:id/reviews
// @access Private
const createCourseReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const course = await Course.findById(req.params.id);

  if (course) {
    const alreadyReviewed = course.reviews.find(
      review => review.user.toString() === req.user.id.toString() // Because userId is an OBJECT, so need to convert to String.
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Course already been reviewed.');
    } else {
      const review = {
        rating: Number(rating),
        comment,
        user: req.user.id,
      };
      course.reviews.push(review);
      course.numReviews = course.reviews.length;

      // Calculate the average rating
      course.rating =
        course.reviews.reduce((acc, r) => r.rating + acc, 0) /
        course.reviews.length;

      await course.save();

      res.status(201).send({ message: 'New review added.' });
    }
  } else {
    res.status(404);
    throw new Error('Course not found.');
  }
});

module.exports = {
  getCourses,
  getCourseReviewsByUser,
  getTopCourseReviews,
  getCourseById,
  getCoursesByCategory,
  getTopCoursesByRating,
  getCoursesByInstructor,
  createCourseReview,
};
