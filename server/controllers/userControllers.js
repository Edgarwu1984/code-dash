const { remove } = require('../models/userModel');
const User = require('../models/userModel');
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
    res.status(404).send({ message: `${error}` });
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
    res.status(404).send({ message: `${error}` });
  }
};

// @description Get User profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        photo: user.photo,
        isAdmin: user.isAdmin,
        updatedAt: user.updatedAt,
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error}` });
  }
};

// @description Update User profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { username, email, photo, password } = req.body;
    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      user.photo = photo || user.photo;
      user.password = password || user.password;

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        photo: updatedUser.photo,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error}` });
  }
};

// @description Get All Users
// @route GET /api/users
// @access Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).send({ message: 'No users' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error}` });
  }
};

// @description Get User by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error}` });
  }
};

// @description Update User
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = async (req, res) => {
  try {
    const { username, email, isAdmin } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      user.isAdmin = isAdmin;

      const updatedUser = user.save();

      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        message: 'User profile updated.',
      });
    } else {
      res.status(404).send({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error}` });
  }
};

// @description Delete User
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.remove();
      res.status(200).send({ message: 'User removed.' });
    } else {
      res.status(404).send({ message: 'User not found.' });
    }
  } catch (error) {
    res.status(404).send({ message: `${error}` });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
