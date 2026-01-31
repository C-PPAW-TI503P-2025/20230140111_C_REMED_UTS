const { Book, BorrowLog, sequelize } = require('../models');

/**
 * Borrow a book
 * User only
 * Requires: bookId, latitude, longitude in request body
 */
const borrowBook = async (req, res, next) => {
    // Start transaction
    const t = await sequelize.transaction();

    try {
        const { bookId, latitude, longitude } = req.body;
        const userId = req.userId; // From middleware

        // Validate required fields
        if (!bookId) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: 'Book ID wajib diisi'
            });
        }

        if (latitude === undefined || longitude === undefined) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: 'Latitude dan longitude wajib diisi'
            });
        }

        // Find book
        const book = await Book.findByPk(bookId, { transaction: t });

        if (!book) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: 'Buku tidak ditemukan'
            });
        }

        // Check stock
        if (book.stock <= 0) {
            await t.rollback();
            return res.status(400).json({
                success: false,
                message: 'Stok buku habis'
            });
        }

        // Decrease stock
        await book.update(
            { stock: book.stock - 1 },
            { transaction: t }
        );

        // Create borrow log
        const borrowLog = await BorrowLog.create({
            userId,
            bookId,
            borrowDate: new Date(),
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude)
        }, { transaction: t });

        // Commit transaction
        await t.commit();

        res.status(201).json({
            success: true,
            message: 'Buku berhasil dipinjam',
            data: {
                borrowLog,
                book: {
                    id: book.id,
                    title: book.title,
                    author: book.author,
                    remainingStock: book.stock
                }
            }
        });
    } catch (error) {
        // Rollback transaction on error
        await t.rollback();
        next(error);
    }
};

/**
 * Get borrow history (Admin only)
 */
const getBorrowHistory = async (req, res) => {
    try {
        const logs = await BorrowLog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'role']
                },
                {
                    model: Book,
                    attributes: ['id', 'title', 'author']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            message: 'Data peminjaman berhasil diambil',
            data: logs
        });
    } catch (error) {
        console.error('Error fetching borrow history:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil data peminjaman',
            error: error.message
        });
    }
};

/**
 * Get my borrow history (User only)
 */
const getMyBorrowHistory = async (req, res) => {
    try {
        const logs = await BorrowLog.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: Book,
                    attributes: ['id', 'title', 'author']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            message: 'Riwayat peminjaman berhasil diambil',
            data: logs
        });
    } catch (error) {
        console.error('Error fetching my history:', error);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil riwayat peminjaman',
            error: error.message
        });
    }
};

/**
 * Return a book (Cancel borrow)
 * User only
 */
const returnBook = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        const { id } = req.params; // BorrowLog ID
        const userId = req.userId;

        const log = await BorrowLog.findByPk(id, { transaction: t });

        if (!log) {
            await t.rollback();
            return res.status(404).json({
                success: false,
                message: 'Riwayat peminjaman tidak ditemukan'
            });
        }

        // Verify ownership
        if (log.userId !== userId) {
            await t.rollback();
            return res.status(403).json({
                success: false,
                message: 'Anda tidak berhak mengembalikan buku pinjaman ini'
            });
        }

        // Find book to restore stock
        const book = await Book.findByPk(log.bookId, { transaction: t });

        if (book) {
            await book.update({ stock: book.stock + 1 }, { transaction: t });
        }

        // Delete log
        await log.destroy({ transaction: t });

        await t.commit();

        res.status(200).json({
            success: true,
            message: 'Buku berhasil dikembalikan'
        });
    } catch (error) {
        await t.rollback();
        next(error);
    }
};

module.exports = {
    borrowBook,
    getBorrowHistory,
    getMyBorrowHistory,
    returnBook
};
