const express = require('express');
const router = express.Router();
const lureController = require('../controllers/lures');

// Routes for lures
router.get('/', lureController.getAllLures);
router.get('/:id', lureController.getLureById);
router.post('/', lureController.createLure);
router.put('/:id', lureController.updateLure);
router.delete('/:id', lureController.deleteLure);

module.exports = router;