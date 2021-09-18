const mongoose = require('mongoose');
const Course = require('./courseModel');

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Rating can not be empty.'],
      min: [1, 'Rating must be greater or equal to 1.0'],
      max: [5, 'Rating must be less or equal to 5.0'],
    },
    comment: {
      type: String,
      required: [true, 'Comment can not be empty.'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Prevent duplicated reviews by same User for the same Course
reviewSchema.index({ course: 1, user: 1 }, { unique: true });

// Populate the User and Course
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'course',
    select: 'name image category',
  }).populate({
    path: 'user',
    select: 'username photo',
  });

  next();
});

// Update the numReviews and Rating
// reviewSchema.statics.calcAverageRating = async function (id) {
//   const stats = await this.aggregate([
//     {
//       $match: { course: id },
//     },
//     {
//       $group: {
//         _id: '$course',
//         numReviews: { $sum: 1 },
//         rating: { $avg: '$rating' },
//       },
//     },
//   ]);

//   if (stats.length > 0) {
//     await Course.findByIdAndUpdate(id, {
//       numReviews: stats[0].numReviews,
//       rating: stats[0].rating,
//     });
//   } else {
//     await Course.findByIdAndUpdate(id, {
//       numReviews: 0,
//       rating: 5,
//     });
//   }
// };

// reviewSchema.pre('save', function (next) {
//   this.constructor.calcAverageRating(this.course);
//   next();
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
