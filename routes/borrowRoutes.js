const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { requireUser, requireAdmin } = require('../middlewares/authMiddleware');

// User routes
router.post('/', requireUser, borrowController.borrowBook);
router.get('/my-history', requireUser, borrowController.getMyBorrowHistory);
router.delete('/:id', requireUser, borrowController.returnBook);

// Admin routes
router.get('/history', requireAdmin, borrowController.getBorrowHistory);

module.exports = router;
