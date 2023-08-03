const express = require('express');
const router = express.Router();
const lureController = require('../controllers/lures');
const { authenticateUser } = require('../middleware/auth');

// Routes for lures
router.get('/', lureController.getAllLures);
router.get('/:id', lureController.getLureById);
router.post('/', authenticateUser, lureController.createLure);
router.put('/:id', authenticateUser, lureController.updateLure);
router.delete('/:id', authenticateUser, lureController.deleteLure);

module.exports = router;