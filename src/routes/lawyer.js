const express = require('express');
const router = express.Router();
const {
  getFeaturedLawyers,
  getTopLawyers,
  getAllLawyers,
  getLawyerById
} = require('../controllers/lawyerController');

// Get all lawyers
router.get('/all', getAllLawyers);

// Get featured lawyers
router.get('/featured', getFeaturedLawyers);

// Get top lawyers
router.get('/top', getTopLawyers);

// Get lawyer by ID
router.get('/:id', getLawyerById);

module.exports = router;