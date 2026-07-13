const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const app = express();

// Routes
const authRoutes = require("./routes/auth");
const lawyerRoutes = require("./routes/lawyer");
const adminRoutes = require("./routes/admin");
const hiringRoutes = require("./routes/hiring");
const transactionRoutes = require("./routes/transaction");
const commentRoutes = require("./routes/comment");

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.CLIENT_URL,
    ],
    credentials: true,
  
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server Running",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/lawyer", lawyerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/hiring", hiringRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/comment", commentRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
console.log(process.env.MONGODB_URI);
// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  
  .catch((err) => console.log(err));


// Start Server
// Start Server (local dev only)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
}

module.exports = app;