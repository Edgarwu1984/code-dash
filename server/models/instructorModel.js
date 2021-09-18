const mongoose = require('mongoose');

const instructorSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
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
  },
  {
    timestamps: true,
  }
);

instructorSchema.pre('save', function (next) {
  this.fullName = this.firstName + ' ' + this.lastName;
  next();
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
