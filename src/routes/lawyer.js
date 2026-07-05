const express = require("express");
const router = express.Router();

const {
  createService,
  getMyServices,
  updateService,
  deleteService,
  getFeaturedLawyers,
  getTopLawyers,
  getAllLawyers,
  getLawyerById,
} = require("../controllers/lawyerController");

const {
  verifyToken,
  verifyLawyer,
} = require("../middleware/auth");

// =============================
// Lawyer Dashboard Routes
// =============================

// Create Service
router.post(
  "/create-service",
  verifyToken,
  verifyLawyer,
  createService
);

// My Services
router.get(
  "/my-services",
  verifyToken,
  verifyLawyer,
  getMyServices
);

// Update Service
router.put(
  "/:id",
  verifyToken,
  verifyLawyer,
  updateService
);

// Delete Service
router.delete(
  "/:id",
  verifyToken,
  verifyLawyer,
  deleteService
);

// =============================
// Public Routes
// =============================

// Featured Lawyers
router.get("/featured", getFeaturedLawyers);

// Top Lawyers
router.get("/top", getTopLawyers);

// Browse Lawyers
router.get("/all", getAllLawyers);

// Lawyer Details
router.get("/:id", getLawyerById);

module.exports = router;