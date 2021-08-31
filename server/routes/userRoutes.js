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
} = require('../controllers/userControllers');

const router = express.Router();

// USER ROUTES
router.route('/login').post(loginUser);
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
  .put(protect, isAdmin, updateUser);

module.exports = router;
