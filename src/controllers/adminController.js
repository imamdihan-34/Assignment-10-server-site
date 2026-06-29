const User = require('../models/User');
const Lawyer = require('../models/Lawyer');
const Hiring = require('../models/Hiring');
const Transaction = require('../models/Transaction');
 
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};
 
const changeUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
 
    if (!['user', 'lawyer', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
 
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    ).select('-password');
 
    res.json({
      message: 'Role updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to change role', error: error.message });
  }
};
 
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
 
    await User.findByIdAndDelete(userId);
    await Lawyer.deleteMany({ userId });
    await Hiring.deleteMany({ userId });
 
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};
 
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('userId', 'email fullName')
      .populate('lawyerId', 'email fullName')
      .sort({ createdAt: -1 });
 
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
  }
};
 
const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalLawyers = await User.countDocuments({ role: 'lawyer' });
    const totalHires = await Hiring.countDocuments({ status: 'accepted' });
    const transactions = await Transaction.find({ status: 'completed' });
    const totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);
 
    res.json({
      totalUsers,
      totalLawyers,
      totalHires,
      totalRevenue
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
};
 
module.exports = {
  getAllUsers,
  changeUserRole,
  deleteUser,
  getAllTransactions,
  getAnalytics
};
 