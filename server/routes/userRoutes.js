const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/userControllers');

const router = express.Router();
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
