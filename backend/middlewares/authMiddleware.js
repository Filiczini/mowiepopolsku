// backend/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (roles) => async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role }

    // Перевірка ролей
    if (roles && !roles.includes(payload.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
