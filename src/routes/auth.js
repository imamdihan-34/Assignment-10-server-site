const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const {
  validateRegister,
  validateLogin,
} = require('../middleware/validateRequest');

// Register
router.post(
  '/register',
  validateRegister,
  authController.register
);

// Login
router.post(
  '/login',
  validateLogin,
  authController.login
);

// Google Login
router.post(
  '/google-login',
  authController.googleLogin
);

module.exports = router;