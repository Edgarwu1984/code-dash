const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const courseSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    courseCategory: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Instructor',
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    features: [{ type: String, required: true }],
    content: [
      {
        contentListName: {
          type: String,
          required: true,
        },
        contentList: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
