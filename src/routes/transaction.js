const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { verifyToken } = require('../middleware/auth');
 
router.post('/payment-intent', verifyToken, transactionController.createPaymentIntent);
router.post('/confirm-payment', verifyToken, transactionController.confirmPayment);
router.get('/my-transactions', verifyToken, transactionController.getUserTransactions);
 
module.exports = router;