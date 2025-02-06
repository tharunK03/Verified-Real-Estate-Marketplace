const express = require('express');
const { createProperty, getAllProperties, verifyProperty } = require('../controllers/propertyController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected routes
router.post('/create', authMiddleware, createProperty);
router.get('/', authMiddleware, getAllProperties);
router.patch('/verify/:propertyId', authMiddleware, verifyProperty);

module.exports = router;



















