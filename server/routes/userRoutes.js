const express = require('express');
const { protect, isAdmin } = require('../middleware/authMiddleware');
const {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userControllers');
const requestTime = require('../middleware/requestTimeMiddleware');

const router = express.Router();

// USER ROUTES
router.route('/login').post(requestTime, loginUser);
router.route('/register').post(registerUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// ADMIN ROUTES
router.route('/').get(protect, isAdmin, getUsers);
router
  .route('/:id')
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser)
  .delete(protect, isAdmin, deleteUser);

module.exports = router;
