const { Book } = require('../models');

/**
 * Get all books
 * Public endpoint
 */
const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.findAll({
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data buku',
            data: books
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get book by ID
 * Public endpoint
 */
const getBookById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Buku tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data buku',
            data: book
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Create new book
 * Admin only
 */
const createBook = async (req, res, next) => {
    try {
        const { title, author, stock } = req.body;

        const book = await Book.create({
            title,
            author,
            stock: stock || 0
        });

        res.status(201).json({
            success: true,
            message: 'Buku berhasil ditambahkan',
            data: book
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update book
 * Admin only
 */
const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, author, stock } = req.body;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Buku tidak ditemukan'
            });
        }

        await book.update({
            title: title || book.title,
            author: author || book.author,
            stock: stock !== undefined ? stock : book.stock
        });

        res.status(200).json({
            success: true,
            message: 'Buku berhasil diupdate',
            data: book
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete book
 * Admin only
 */
const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params;

        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Buku tidak ditemukan'
            });
        }

        await book.destroy();

        res.status(200).json({
            success: true,
            message: 'Buku berhasil dihapus'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
