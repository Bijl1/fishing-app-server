const express = require('express');
const router = express.Router();
const sinkerController = require('../controllers/sinkers');
const { authenticateUser } = require('../middleware/auth');


router.get('/', sinkerController.getAllSinkers);
router.get('/:id', sinkerController.getSinkerById);
router.post('/', sinkerController.createSinker);
router.put('/:id', sinkerController.updateSinker);
router.delete('/:id', sinkerController.deleteSinker);

module.exports = router;