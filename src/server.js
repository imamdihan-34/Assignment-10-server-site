const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const envPath = path.resolve(__dirname, '../.env');
const envConfig = dotenv.config({ path: envPath });
dotenvExpand.expand(envConfig);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const lawyerRoutes = require('./routes/lawyer');

const app = express();

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/lawyer', lawyerRoutes);

// 404 Handler
app.use((req, res) => {
  console.log('404 - Path not found:', req.path);
  res.status(404).json({ message: 'Route not found', path: req.path });
});

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/legalease';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('✅ MongoDB Connected: localhost');
  })
  .catch((error) => {
    console.error('❌ MongoDB Error:', error.message);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📝 Routes registered:');
  console.log('   - GET /api/health');
  console.log('   - POST /api/auth/register');
  console.log('   - POST /api/auth/login');
  console.log('   - GET /api/lawyer/featured');
  console.log('   - GET /api/lawyer/top');
});

module.exports = app;