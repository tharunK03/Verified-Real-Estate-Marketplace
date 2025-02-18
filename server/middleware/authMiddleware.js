const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  try {
    const token = authHeader.split(" ")[1];
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token. Please log in again." });
  }
};
