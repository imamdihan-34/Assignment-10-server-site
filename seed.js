const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require('./src/models/User');
const Lawyer = require('./src/models/Lawyer');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

    await User.deleteMany({});
    await Lawyer.deleteMany({});

    const password = await bcrypt.hash("123456", 10);

    const users = await User.insertMany([
      {
        fullName: "John Smith",
        email: "john@gmail.com",
        password,
        role: "lawyer"
      },
      {
        fullName: "Sarah Johnson",
        email: "sarah@gmail.com",
        password,
        role: "lawyer"
      },
      {
        fullName: "Mike Davis",
        email: "mike@gmail.com",
        password,
        role: "lawyer"
      },
      {
        fullName: "Emily Wilson",
        email: "emily@gmail.com",
        password,
        role: "lawyer"
      },
      {
        fullName: "James Brown",
        email: "james@gmail.com",
        password,
        role: "lawyer"
      },
      {
        fullName: "Dihan",
        email: "admin@gmail.com",
        password,
        role: "user"
      }
    ]);

    await Lawyer.insertMany([
      {
        userId: users[0]._id,
        bio: "Expert Criminal Lawyer",
        specialization: "Criminal Law",
        hourlyRate: 250,
        profilePicture: "https://via.placeholder.com/300?text=John",
        status: "available",
        totalHires: 25,
        isPublished: true
      },
      {
        userId: users[1]._id,
        bio: "Corporate Law Specialist",
        specialization: "Corporate Law",
        hourlyRate: 300,
        profilePicture: "https://via.placeholder.com/300?text=Sarah",
        status: "available",
        totalHires: 30,
        isPublished: true
      },
      {
        userId: users[2]._id,
        bio: "Family Law Expert",
        specialization: "Family Law",
        hourlyRate: 180,
        profilePicture: "https://via.placeholder.com/300?text=Mike",
        status: "busy",
        totalHires: 18,
        isPublished: true
      },
      {
        userId: users[3]._id,
        bio: "Tax Law Consultant",
        specialization: "Tax Law",
        hourlyRate: 350,
        profilePicture: "https://via.placeholder.com/300?text=Emily",
        status: "available",
        totalHires: 40,
        isPublished: true
      },
      {
        userId: users[4]._id,
        bio: "Real Estate Lawyer",
        specialization: "Real Estate",
        hourlyRate: 280,
        profilePicture: "https://via.placeholder.com/300?text=James",
        status: "available",
        totalHires: 22,
        isPublished: true
      }
    ]);

    console.log("Seed Completed Successfully");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit();
  }
}

seed();