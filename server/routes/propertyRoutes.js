const express = require("express");
const router = express.Router();
const { createProperty } = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");

// ✅ Secure Route for Property Creation
router.post("/create", protect, createProperty);

module.exports = router;
