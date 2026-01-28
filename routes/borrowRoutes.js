const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { requireUser } = require('../middlewares/authMiddleware');

// User routes
router.post('/', requireUser, borrowController.borrowBook);

module.exports = router;
