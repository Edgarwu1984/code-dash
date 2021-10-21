const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');
const generateToken = require('../utils/generateToken');

// @description User Login
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    if (user.isActivated === false) {
      res.status(404);
      throw new Error('User does not exist.');
    } else {
      // Update the last login Date
      user.lastTimeLogin = req.requestTime;
      const updatedUser = await user.save();

      res.status(201).json({
        status: 'Login Success',
        requestTime: req.requestTime,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          photo: user.photo,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
          lastTimeLogin: updatedUser.lastTimeLogin,
        },
      });
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @description User Register
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email, photo } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exist.');
  }

  const user = await User.create({
    username: username,
    email: email,
    password: password,
    photo: photo,
    lastTimeLogin: req.requestTime,
  });

  if (user) {
    res.status(201).json({
      status: 'Register Success',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        photo: user.photo,
        isAdmin: user.isAdmin,
        lastTimeLogin: user.lastTimeLogin,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

// @description Get User profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('reviews');

  if (user) {
    res.status(200).json({
      status: 'Success',
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        photo: user.photo,
        isAdmin: user.isAdmin,
        updatedAt: user.updatedAt,
        lastTimeLogin: user.lastTimeLogin,
        reviews: user.reviews,
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

// @description Update User profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { username, email, photo, password, isAdmin, isActivated } = req.body;
  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.photo = photo || user.photo;
    user.password = password || user.password;
    user.isAdmin = isAdmin || user.isAdmin;
    user.isActivated = isActivated || user.isActivated;

    const updatedUser = await user.save();

    res.status(200).json({
      status: 'Update Success',
      data: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        photo: updatedUser.photo,
        isAdmin: updatedUser.isAdmin,
        isActivated: updatedUser.isActivated,
        token: generateToken(updatedUser._id),
      },
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @description Get All Users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ isAdmin: -1 }).populate('reviews');
  if (users) {
    res.status(200).json({
      status: 'Success',
      result: users.length,
      data: users,
    });
  } else {
    res.status(404);
    throw new Error('No users');
  }
});

// @description Get User by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json({ status: 'Success', data: user });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

// @description Update User
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const { username, email, isAdmin, isActivated } = req.body;
  const user = await User.findById(req.params.id);
  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.isActivated = isActivated;
    user.isAdmin = isAdmin;

    const updatedUser = user.save();

    res.status(200).json({
      status: 'Update Success',
      data: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isActivated: updatedUser.isActivated,
        isAdmin: updatedUser.isAdmin,
      },
      message: 'User profile updated.',
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
};
