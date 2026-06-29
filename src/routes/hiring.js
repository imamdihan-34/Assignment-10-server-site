const express = require('express');
const router = express.Router();
const hiringController = require('../controllers/hiringController');
const { verifyToken } = require('../middleware/auth');
 
router.post('/create', verifyToken, hiringController.createHiring);
router.get('/check/:lawyerId', verifyToken, hiringController.checkHiringStatus);
router.get('/user-history', verifyToken, hiringController.getUserHiringHistory);
router.get('/lawyer-requests', verifyToken, hiringController.getLawyerHiringRequests);
 
router.put('/:id/accept', verifyToken, hiringController.acceptHiring);
router.put('/:id/reject', verifyToken, hiringController.rejectHiring);
 
module.exports = router;
 