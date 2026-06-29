const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/auth');
 
router.get('/users', verifyAdmin, adminController.getAllUsers);
router.get('/transactions', verifyAdmin, adminController.getAllTransactions);
router.get('/analytics', verifyAdmin, adminController.getAnalytics);
 
router.put('/user/:userId/role', verifyAdmin, adminController.changeUserRole);
router.delete('/user/:userId', verifyAdmin, adminController.deleteUser);
 
module.exports = router;