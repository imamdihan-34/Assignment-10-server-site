const path = require('path');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

// .env file load করো
const envPath = path.resolve(__dirname, '../.env');
const envConfig = dotenv.config({ path: envPath });
dotenvExpand.expand(envConfig);

console.log('📁 .env file path:', envPath);
console.log('✅ .env loaded:', envConfig.parsed ? Object.keys(envConfig.parsed).length + ' variables' : 'Failed');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

console.log('🔍 Environment Variables Check:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Not set');


// বাকি সব code...

// Routes import করো (সঠিক path সহ)
const authRoutes = require('./routes/auth');
const lawyerRoutes = require('./routes/lawyer');
const hiringRoutes = require('./routes/hiring');
const commentRoutes = require('./routes/comment');
const adminRoutes = require('./routes/admin');
const transactionRoutes = require('./routes/transaction');
require('dotenv').config();
const { errorHandler } = require('./middleware/errorHandler');
const { connectDB } = require('./config/database');

const app = express();

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://legalease.vercel.app',
    '*'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Connect Database
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/lawyer', lawyerRoutes);
app.use('/api/hiring', hiringRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transaction', transactionRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', time: new Date() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;