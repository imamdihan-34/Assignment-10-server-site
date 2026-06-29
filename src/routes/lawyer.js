const express = require('express');
const router = express.Router();
const lawyerController = require('../controllers/lawyerController');

// Get all lawyers
router.get('/all', lawyerController.getAllLawyers);

// Get featured lawyers
router.get('/featured', lawyerController.getFeaturedLawyers);

// Get top lawyers
router.get('/top', lawyerController.getTopLawyers);

// Get lawyer by ID
router.get('/:id', lawyerController.getLawyerById);


module.exports = router;