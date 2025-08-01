const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = []; // Use DB in future

// Signup (can be improved later)
router.post("/signup", (req, res) => {
    const { email, password } = req.body;

    // Store in users array or DB
    users.push({ email, password });

    res.json({ message: "Signup successful" });
});

// Signin (Login + Generate Token)
router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.json({ token });
});

module.exports = router;
