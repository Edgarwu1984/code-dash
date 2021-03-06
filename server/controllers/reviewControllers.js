const Review = require('../models/reviewModel');
const Course = require('../models/courseModel');
const asyncHandler = require('../utils/asyncHandler');

// @description Get  Reviews
// @route GET /api/reviews
// @access Public
const getReviews = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.params.id) {
    filter = { course: req.params.id };
  }

  // If has filter object with course ID, only find by course ID
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: reviews,
  });
});

// @description Create Reviews
// @route POST /api/courses/:id/reviews
// @access Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const course = await Course.findById(req.params.id);

  if (rating && comment) {
    await Review.create({
      rating,
      comment,
      course: req.params.id,
      user: req.user.id,
    });

    // Update numReviews & totalRating in Course Model
    course.numReviews += 1;
    course.totalRating += Number(rating);
    await course.save();

    res.status(201).send('New review added.');
  } else {
    res.status(400);
    throw new Error('Invalid review data.');
  }
});

// @description Delete Reviews
// @route DELETE /api/courses/:id/reviews
// @access Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  const course = await Course.findById(review.course.id);

  if (!review) {
    res.status(400);
    throw new Error('Error, Can not found review.');
  } else {
    course.numReviews -= 1;
    course.totalRating = course.totalRating - review.rating;
    await course.save();
    await review.remove();
    res.status(200).json({
      status: 'success',
      message: 'Review deleted.',
    });
  }
});

// @description Get 3 Top Reviews
// @route GET /api/reviews/top
// @access Public
const getTopReviews = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.params.id) {
    filter = { course: req.params.id };
  }
  const reviews = await Review.find(filter)
    .where('data.rating')
    .gte(4.8)
    .sort({ rating: -1 })
    .limit(3);
  if (reviews) {
    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: reviews,
    });
  } else {
    res.status(404);
    throw new Error('No Reviews.');
  }
});

module.exports = { getReviews, createReview, deleteReview, getTopReviews };
