const express = require("express");
const { createProperty, getVerifiedProperties } = require("../controllers/propertyController"); // ✅ Ensure functions are imported correctly

const router = express.Router();

// ✅ Route for creating a property
router.post("/create", createProperty);

// ✅ Route for fetching only verified properties
router.get("/verified", getVerifiedProperties);

module.exports = router;
