const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Access Denied: No Token Provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Pass user data to next step
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid Token" });
    }
};

module.exports = authenticate;
