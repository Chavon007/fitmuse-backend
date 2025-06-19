const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models.js"); 

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "2476";

router.get("/verify-user", async (req, res) => { 
  const authHeader = req.headers.authorization;
  console.log(" Incoming /verify-user request...");
  console.log("Authorization Header:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.warn(" No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log(" Token decoded:", decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.warn(" User not found with ID:", decoded.id);
      return res.status(404).json({ message: "User not found" });
    }

    console.log(" User found:", user.email);
    res.json({ user });
  } catch (err) {
    console.error(" Token verification error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
});


module.exports = router;
