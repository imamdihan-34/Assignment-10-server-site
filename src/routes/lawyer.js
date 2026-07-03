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

// ===============================
// Public Routes
// ===============================

// Home Featured Lawyers
router.get("/featured", getFeaturedLawyers);

// Top Lawyers
router.get("/top", getTopLawyers);

// Browse Lawyers
router.get("/all", getAllLawyers);

// Single Lawyer Details
router.get("/:id", getLawyerById);

// ===============================
// Lawyer Dashboard Routes
// ===============================

// Get My Service
router.get(
  "/my-services",
  verifyToken,
  verifyLawyer,
  getMyServices
);

// Create Service
router.post(
  "/create-service",
  verifyToken,
  verifyLawyer,
  createService
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

module.exports = router;