const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = []; // In-memory user storage for now

// ▶️ Signup Route
router.post("/signup", (req, res) => {
    const { fullName, email, username, password } = req.body;

    // Save user in memory (replace with DB later)
    users.push({ fullName, email, username, password });

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ message: "Signup successful", token });
});

// ▶️ Signin Route
router.post("/signin", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.json({ message: "Signin successful", token });
});

module.exports = router;
