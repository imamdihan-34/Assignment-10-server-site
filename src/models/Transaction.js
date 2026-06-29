const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  hiringId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hiring'
  },
  amount: {
    type: Number,
    required: true
  },
  stripeTransactionId: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);