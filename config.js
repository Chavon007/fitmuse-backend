const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
  } catch (err) {
    console.error("MongoDB connection error");
  }
}

module.exports = connectDB;
