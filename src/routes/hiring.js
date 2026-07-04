const express = require("express");
const router = express.Router();
const { verifyToken,verifyLawyer } = require("../middleware/auth");
const { createHiring,rejectHiring,acceptHiring,lawyerHistory,userHistory } = require("../controllers/hiringController"); 

router.get("/user", verifyToken, userHistory);
router.post("/createhiring",verifyToken,createHiring)
router.get("/lawyer", verifyToken, verifyLawyer, lawyerHistory);

router.patch("/:id/accept", verifyToken, verifyLawyer, acceptHiring);

router.patch("/:id/reject", verifyToken, verifyLawyer, rejectHiring);



module.exports = router;