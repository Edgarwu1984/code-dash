const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
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
});

userSchema.methods.matchPassword = async enteredPassword => {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async next => {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
