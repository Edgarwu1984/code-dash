const mongoose = require('mongoose');
const slugify = require('slugify');

// const reviewSchema = mongoose.Schema(
//   {
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const courseSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, 'Course must have category.'],
    },
    courseCategory: {
      type: String,
      required: [true, 'Course must have course category.'],
    },
    name: {
      type: String,
      required: [true, 'Course must have a name.'],
      unique: true,
      trim: true,
      maxlength: [40, 'Course name must be less or equal then 40 characters'],
      minlength: [10, 'Course name must be more or equal then 10 characters'],
    },
    slug: String,
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Course must have an instructor.'],
      ref: 'Instructor',
    },
    image: {
      type: String,
      required: [true, 'Course must be have a image.'],
    },
    description: {
      type: String,
      required: [true, 'Course must be have description.'],
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
      min: [1, 'Rating must be greater or equal to 1.0'],
      max: [5, 'Rating must be less or equal to 5.0'],
      default: 4.5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    timestamps: true,
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()

// Create Slug by Name
courseSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
