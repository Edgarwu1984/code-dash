const mongoose = require('mongoose');
const slugify = require('slugify');

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
      maxlength: [60, 'Course name must be less or equal then 40 characters'],
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
      default: 5,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
// Populate the User and Course
courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'instructor',
    select: 'fullName',
  });
  next();
});

// Virtual populate
courseSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'course',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// Create Slug by Name
courseSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Calculate Average Rating
courseSchema.pre('save', function (next) {
  this.rating = (this.totalRating / this.numReviews).toFixed(1);
  next();
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
