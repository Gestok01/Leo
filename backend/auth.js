const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = []; // Temporary in-memory storage

// Signup
router.post("/signup", (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Check if user already exists
  const userExists = users.find(user => user.email === email || user.username === username);
  if (userExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Save user
  const newUser = { fullName, email, username, password };
  users.push(newUser);

  // Generate token
  const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret123", {
    expiresIn: "7d"
  });

  res.json({ message: "Signup successful", token });
});

// Signin
router.post("/signin", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret123", {
    expiresIn: "7d"
  });

  res.json({ message: "Signin successful", token });
});

module.exports = router;

