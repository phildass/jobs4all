const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update allowed fields
    const allowedUpdates = ['name', 'phone', 'company', 'location', 'resume', 'skills', 'experience'];
    
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/users/change-password
// @desc    Change user password
// @access  Private
router.put(
  '/change-password',
  [
    protect,
    [
      body('currentPassword').notEmpty().withMessage('Current password is required'),
      body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user._id).select('+password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check current password
      const isMatch = await user.matchPassword(req.body.currentPassword);

      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Set new password
      user.password = req.body.newPassword;
      await user.save();

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
