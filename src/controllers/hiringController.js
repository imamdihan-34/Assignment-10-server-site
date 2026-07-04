const Hiring = require("../models/Hiring");
const Lawyer = require("../models/Lawyer");

// ==========================
// Create Hiring
// ==========================
exports.createHiring = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.body.lawyerId);

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    const already = await Hiring.findOne({
      userId: req.userId,
      lawyerId: lawyer._id,
      paymentStatus: "unpaid",
    });

    if (already) {
      return res.status(400).json({
        message: "Already Requested",
      });
    }

    const hiring = await Hiring.create({
      userId: req.userId,
      lawyerId: lawyer._id,
      fee: lawyer.hourlyRate,
    });

    res.status(201).json(hiring);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ==========================
// User Hiring History
// ==========================
exports.userHistory = async (req, res) => {
  try {
    const hirings = await Hiring.find({
      userId: req.userId,
    })
      .populate({
        path: "lawyerId",
        populate: {
          path: "userId",
          select: "fullName email profilePicture",
        },
      })
      .sort({ createdAt: -1 });

    res.json(hirings);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ==========================
// Lawyer Hiring History
// ==========================
exports.lawyerHistory = async (req, res) => {
  try {
    const lawyer = await Lawyer.findOne({
      userId: req.userId,
    });

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    const hirings = await Hiring.find({
      lawyerId: lawyer._id,
    })
      .populate("userId", "fullName email profilePicture")
      .sort({ createdAt: -1 });

    res.json(hirings);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ==========================
// Accept Hiring
// ==========================
exports.acceptHiring = async (req, res) => {
  try {
    const hiring = await Hiring.findById(req.params.id);

    if (!hiring) {
      return res.status(404).json({
        message: "Hiring not found",
      });
    }

    hiring.status = "accepted";
    await hiring.save();

    res.json({
      message: "Hiring Accepted",
      hiring,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ==========================
// Reject Hiring
// ==========================
exports.rejectHiring = async (req, res) => {
  try {
    const hiring = await Hiring.findById(req.params.id);

    if (!hiring) {
      return res.status(404).json({
        message: "Hiring not found",
      });
    }

    hiring.status = "rejected";
    await hiring.save();

    res.json({
      message: "Hiring Rejected",
      hiring,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};