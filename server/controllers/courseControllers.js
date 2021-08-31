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
    res.status(404).send({ message: `${error}` });
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
    res.status(404).send({ message: `${error}` });
  }
};

// @description Create review
// @route GET /api/courses/:id/reviews
// @access Private
const createCourseReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const course = await Course.findById(req.params.id);

    if (course) {
      const alreadyReviewed = course.reviews.find(
        review => review.user.toString() === req.user.id.toString()
      );

      if (alreadyReviewed) {
        res.status(400).send({ message: 'Course already been reviewed.' });
      } else {
        const review = {
          username: req.user.username,
          photo: req.user.photo,
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

        res.status(201).json({ message: 'New review addeed.' });
      }
    } else {
      res.status(404).send({ message: 'Course not found.' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error}` });
  }
};

module.exports = { getCourses, getCourseById, createCourseReview };
