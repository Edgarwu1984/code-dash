const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: false,
      minlength: [6, 'Password at least 6 characters.'],
    },
    photo: {
      type: String,
      required: false,
      default: '/images/user_photo_default.jpg',
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    lastTimeLogin: {
      type: Date,
    },
    reviews: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Review' },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare the password user entered;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
