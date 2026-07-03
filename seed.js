const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./src/models/User");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    // পুরনো admin থাকলে delete করবে (optional)
    await User.deleteOne({ email: "admin@gmail.com" });

    const hashedPassword = await bcrypt.hash("123456", 10);

    const admin = new User({
      fullName: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      profilePicture: "",
      isGoogleUser: false,
      status: "active"
    });

    await admin.save();

    console.log("✅ Admin Created Successfully");
    console.log("=================================");
    console.log("Email    : admin@gmail.com");
    console.log("Password : 123456");
    console.log("Role     : admin");
    console.log("=================================");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();