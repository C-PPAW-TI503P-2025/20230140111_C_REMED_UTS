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

module.exports = {
    borrowBook
};
