const express = require('express');
const router = express.Router();
const controller = require('../controllers/VendaController');

router.get('/', controller.get);
router.get('/:id', controller.getById);
router.post('/', controller.post);
router.delete('/:id', controller.delete);

module.exports = router;