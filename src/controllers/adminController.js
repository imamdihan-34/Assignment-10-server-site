const User = require("../models/User");
const Lawyer = require("../models/Lawyer");

// ================================
// Get All Users
// ================================
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================================
// Change User Role
// ================================
exports.changeRole = async (req, res) => {
  try {
    const { role } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.role = role;

    await user.save();

    res.json({
      message: "Role Updated Successfully",
      user,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

// ================================
// Delete User
// ================================
exports.deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    await Lawyer.deleteOne({
      userId: req.params.id,
    });

    res.json({
      message: "User Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

// ================================
// Analytics
// ================================
exports.getAnalytics = async (req, res) => {

  try {

    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalLawyers = await User.countDocuments({
      role: "lawyer",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    const totalServices = await Lawyer.countDocuments();

    const totalPublished = await Lawyer.countDocuments({
      isPublished: true,
    });

    const totalHires = await Lawyer.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$totalHires",
          },
        },
      },
    ]);

    res.json({
      totalUsers,
      totalLawyers,
      totalAdmins,
      totalServices,
      totalPublished,
      totalHires: totalHires[0]?.total || 0,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};

// ================================
// Transactions (Temporary)
// ================================
exports.getAllTransactions = async (req, res) => {

  res.json([]);

};