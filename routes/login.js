const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models.js");

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "2476";

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect Password" });

    const token = jwt.sign({ email: user.email }, SECRET, {
      expiresIn: "1h",
    });

    res.send({
      message: "Login successful",
      user: { email: user.email },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
