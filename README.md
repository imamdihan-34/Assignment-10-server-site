# LegalEase - Server

Node.js/Express backend API for the LegalEase lawyer discovery platform.

## 🎯 Features

- **User Authentication** - Email/password registration and login with JWT
- **Lawyer Management** - CRUD operations for lawyer profiles
- **Booking System** - Create and manage lawyer bookings
- **Error Handling** - Comprehensive error handling middleware
- **CORS Support** - Cross-origin resource sharing enabled
- **MongoDB Integration** - Document-based database for data storage
- **Security** - JWT token-based authentication

## 📋 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Management**: dotenv
- **Port**: 5000 (Development)

## 🚀 Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB (local or Atlas)
## 🔐 Authentication

### JWT Token Structure
- Header: `Authorization: Bearer <token>`
- Token contains: `{ userId, email, role }`
- Expires: 7 days

### Protected Routes
- Hiring routes require valid JWT token
- Token should be passed in Authorization header

## 📊 Database Schema

### User Model
