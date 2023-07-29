const express = require('express');
const router = express.Router();
const lineController = require('../controllers/lines');
const { authenticateUser } = require('../middleware/auth'); // Import the authenticateUser middleware

// Public route - Get all lines (no authentication required)
router.get('/', lineController.getAllLines);

// Protected routes - Requires JWT authentication
router.get('/:id', authenticateUser, lineController.getLineById);
router.post('/', authenticateUser, lineController.createLine);
router.put('/:id', authenticateUser, lineController.updateLine);
router.delete('/:id', authenticateUser, lineController.deleteLine);

module.exports = router;
