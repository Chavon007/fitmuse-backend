const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models.js"); 

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "2476";

router.get("/verify-user", async (req, res) => { 
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
