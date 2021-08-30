const mongoose = require('mongoose');

const instructorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
    default: '/images/user_photo_default.jpg',
  },
  introduction: {
    type: String,
    required: true,
  },
  instructorRating: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
