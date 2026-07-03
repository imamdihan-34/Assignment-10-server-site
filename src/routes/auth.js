const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const {
  validateRegister,
  validateLogin,
} = require('../middleware/validateRequest');

router.get("/register", (req, res) => {
  res.json({
    success: true,
    message: "GET Register Route Working"
  });
});
router.post("/register", authController.register);

router.post(
  '/login',
  validateLogin,
  authController.login
);

router.post(
  '/google-login',
  authController.googleLogin
);

module.exports = router;