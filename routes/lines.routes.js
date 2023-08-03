const express = require('express');
const router = express.Router();
const lineController = require('../controllers/lines');
const { authenticateUser } = require('../middleware/auth');

// Routes for lines
router.get('/', lineController.getAllLines);
router.get('/:id', lineController.getLineById);
router.post('/', authenticateUser, lineController.createLine);
router.put('/:id', authenticateUser, lineController.updateLine);
router.delete('/:id', authenticateUser, lineController.deleteLine);

module.exports = router;