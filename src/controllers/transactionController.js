const stripe = require('../config/stripe');
const Transaction = require('../models/Transaction');
const Hiring = require('../models/Hiring');
const Lawyer = require('../models/Lawyer');
 
const createPaymentIntent = async (req, res) => {
  try {
    const { hiringId, amount } = req.body;
    const userId = req.userId;
 
    // Verify hiring record
    const hiring = await Hiring.findById(hiringId).populate('lawyerId');
    if (!hiring) {
      return res.status(404).json({ message: 'Hiring record not found' });
    }
 
    if (hiring.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
 
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: {
        hiringId,
        userId
      }
    });
 
    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment intent', error: error.message });
  }
};
 
const confirmPayment = async (req, res) => {
  try {
    const { hiringId, paymentIntentId, amount } = req.body;
    const userId = req.userId;
 
    // Verify payment
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not successful' });
    }
 
    // Update hiring record
    const hiring = await Hiring.findByIdAndUpdate(
      hiringId,
      { isPaid: true },
      { new: true }
    ).populate('lawyerId');
 
    // Create transaction record
    const transaction = new Transaction({
      userId,
      lawyerId: hiring.lawyerId,
      hiringId,
      amount,
      stripeTransactionId: paymentIntentId,
      status: 'completed'
    });
 
    await transaction.save();
 
    // Update lawyer total hires
    await Lawyer.findByIdAndUpdate(
      hiring.lawyerId,
      { $inc: { totalHires: 1 } }
    );
 
    res.json({
      message: 'Payment successful',
      hiring,
      transaction
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to confirm payment', error: error.message });
  }
};
 
const getUserTransactions = async (req, res) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });
 
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
  }
};
 
module.exports = {
  createPaymentIntent,
  confirmPayment,
  getUserTransactions
};
 