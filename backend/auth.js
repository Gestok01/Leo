const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = []; // Replace with DB later

// Signup
router.post("/signup", (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (!fullName || !email || !username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existing = users.find(u => u.username === username);
  if (existing) {
    return res.status(409).json({ message: "User already exists" });
  }

  users.push({ fullName, email, username, password });

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, message: "Signup successful" });
});

// Signin
router.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

module.exports = router;

