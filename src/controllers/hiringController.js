const Hiring = require('../models/Hiring');
const Lawyer = require('../models/Lawyer');
 
const createHiring = async (req, res) => {
  try {
    const { lawyerId } = req.body;
    const userId = req.userId;
 
    // Check if already hired
    const existingHiring = await Hiring.findOne({ userId, lawyerId });
    if (existingHiring) {
      return res.status(400).json({ message: 'Already hired this lawyer' });
    }
 
    const hiring = new Hiring({
      userId,
      lawyerId,
      status: 'pending'
    });
 
    await hiring.save();
 
    res.status(201).json({
      message: 'Hiring request sent',
      hiring
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create hiring', error: error.message });
  }
};
 
const acceptHiring = async (req, res) => {
  try {
    const { id } = req.params;
 
    const hiring = await Hiring.findByIdAndUpdate(
      id,
      { status: 'accepted' },
      { new: true }
    );
 
    res.json({
      message: 'Hiring request accepted',
      hiring
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to accept hiring', error: error.message });
  }
};
 
const rejectHiring = async (req, res) => {
  try {
    const { id } = req.params;
 
    const hiring = await Hiring.findByIdAndUpdate(
      id,
      { status: 'rejected' },
      { new: true }
    );
 
    res.json({
      message: 'Hiring request rejected',
      hiring
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject hiring', error: error.message });
  }
};
 
const getUserHiringHistory = async (req, res) => {
  try {
    const userId = req.userId;
 
    const hirings = await Hiring.find({ userId })
      .populate({
        path: 'lawyerId',
        populate: { path: 'userId', select: 'fullName email' },
        select: 'userId specialization hourlyRate status'
      })
      .sort({ createdAt: -1 });
 
    const hiringList = hirings.map(hiring => ({
      _id: hiring._id,
      lawyerId: {
        _id: hiring.lawyerId._id,
        fullName: hiring.lawyerId.userId.fullName,
        email: hiring.lawyerId.userId.email,
        specialization: hiring.lawyerId.specialization,
        hourlyRate: hiring.lawyerId.hourlyRate,
        status: hiring.lawyerId.status
      },
      status: hiring.status,
      isPaid: hiring.isPaid,
      createdAt: hiring.createdAt
    }));
 
    res.json(hiringList);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hiring history', error: error.message });
  }
};
 
const getLawyerHiringRequests = async (req, res) => {
  try {
    const userId = req.userId;
 
    // Get all lawyers of this user
    const lawyers = await Lawyer.find({ userId });
    const lawyerIds = lawyers.map(l => l._id);
 
    const hirings = await Hiring.find({ lawyerId: { $in: lawyerIds } })
      .populate('userId', 'fullName email')
      .populate('lawyerId')
      .sort({ createdAt: -1 });
 
    res.json(hirings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch hiring requests', error: error.message });
  }
};
 
const checkHiringStatus = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const userId = req.userId;
 
    const hiring = await Hiring.findOne({ userId, lawyerId, status: 'accepted' });
 
    res.json({
      hired: !!hiring,
      hiring
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to check hiring status', error: error.message });
  }
};
 
module.exports = {
  createHiring,
  acceptHiring,
  rejectHiring,
  getUserHiringHistory,
  getLawyerHiringRequests,
  checkHiringStatus
};