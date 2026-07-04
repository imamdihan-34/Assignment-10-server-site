const mongoose = require('mongoose');

const lawyerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  specialization: {
    type: String,
    required: true,
    enum: ['Criminal Law', 'Corporate Law', 'Family Law', 'Tax Law', 'Real Estate', 'IP Law']
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 0
  },
  profilePicture: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['available', 'busy'],
    default: 'available'
  },
  totalHires: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('Lawyer', lawyerSchema);