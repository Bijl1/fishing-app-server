const express = require('express');
const router = express.Router();
const lineController = require('../controllers/lines');

// Routes for lines
router.get('/', lineController.getAllLines);
router.get('/:id', lineController.getLineById);
router.post('/', lineController.createLine);
router.put('/:id', lineController.updateLine);
router.delete('/:id', lineController.deleteLine);

module.exports = router;