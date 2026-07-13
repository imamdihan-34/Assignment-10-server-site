
const Lawyer = require("../models/Lawyer");

// ===========================
// Create Legal Service
// ===========================
exports.createService = async (req, res) => {
  try {
    const exists = await Lawyer.findOne({
      userId: req.userId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Service already exists",
      });
    }

    const lawyer = await Lawyer.create({
      userId: req.userId,
      specialization: req.body.specialization,
      bio: req.body.bio,
      hourlyRate: req.body.hourlyRate,
      profilePicture: req.body.profilePicture,
      status: "available",
      isPublished: false,
    });

    res.status(201).json(lawyer);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ===========================
// My Services
// ===========================

exports.getMyServices = async (req, res) => {
  try {
    const services = await Lawyer.find({
      userId: req.userId,
    }).populate("userId", "fullName email");

    res.json(services);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ===========================
// Update Service
// ===========================

exports.updateService = async (req, res) => {
  try {
    const lawyer = await Lawyer.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!lawyer) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    lawyer.specialization = req.body.specialization;
    lawyer.bio = req.body.bio;
    lawyer.hourlyRate = req.body.hourlyRate;
    lawyer.profilePicture = req.body.profilePicture;

    lawyer.updatedAt = Date.now();

    await lawyer.save();

    res.json({
      message: "Updated Successfully",
      lawyer,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ===========================
// Delete Service
// ===========================

exports.deleteService = async (req, res) => {
  try {
    const lawyer = await Lawyer.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!lawyer) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ===========================
// Featured Lawyers
// ===========================

exports.getFeaturedLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find({
      isPublished: true,
    })
      .populate("userId", "fullName email profilePicture")
      .limit(6);

    res.json(lawyers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ===========================
// Top Lawyers
// ===========================

exports.getTopLawyers = async (req, res) => {
  try {
    const lawyers = await Lawyer.find({
      isPublished: true,
    })
      .populate("userId", "fullName email profilePicture")
      .sort({
        totalHires: -1,
      })
      .limit(3);

    res.json(lawyers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ===========================
// Browse Lawyers
// ===========================

exports.getAllLawyers = async (req, res) => {
  try {
    // await connectDB()
    const lawyers = await Lawyer.find({
      isPublished: true,
    }).populate("userId", "fullName email profilePicture");

    res.json(lawyers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ===========================
// Lawyer Details
// ===========================

exports.getLawyerById = async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id)
      .populate("userId", "fullName email profilePicture");

    if (!lawyer) {
      return res.status(404).json({
        message: "Lawyer not found",
      });
    }

    res.json(lawyer);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};