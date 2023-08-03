const express = require('express');
const router = express.Router();
const sinkerController = require('../controllers/sinkers');
const { authenticateUser } = require('../middleware/auth');

// Routes for sinkers
router.get('/', sinkerController.getAllSinkers);
router.get('/:id', sinkerController.getSinkerById);
router.post('/', authenticateUser, sinkerController.createSinker);
router.put('/:id', authenticateUser, sinkerController.updateSinker);
router.delete('/:id', authenticateUser, sinkerController.deleteSinker);

module.exports = router;