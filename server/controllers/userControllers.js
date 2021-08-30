const User = require('../models/userModal');
const generateToken = require('../utils/generateToken');

// @description User Login
// @route GET /api/users/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        photo: user.photo,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).send({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error.reason}` });
  }
};

// @description User Register
// @route GET /api/users/register
// @access Public
const registerUser = async (req, res) => {
  try {
    const { username, password, email, photo } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(400).send({ message: 'User already exist.' });
    }

    const user = await User.create({
      username: username,
      email: email,
      password: password,
      photo: photo,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        photo: user.photo,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send({ message: 'Invalid user data.' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error.reason}` });
  }
};

module.exports = { loginUser, registerUser };
