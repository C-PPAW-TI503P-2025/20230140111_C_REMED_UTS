/**
 * Global error handling middleware
 */

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Sequelize Validation Error
    if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: errors
        });
    }

    // Sequelize Unique Constraint Error
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            success: false,
            message: 'Data sudah ada dalam database'
        });
    }

    // Sequelize Foreign Key Constraint Error
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({
            success: false,
            message: 'Referensi data tidak valid'
        });
    }

    // Sequelize Database Error
    if (err.name === 'SequelizeDatabaseError') {
        return res.status(500).json({
            success: false,
            message: 'Database error',
            error: err.message
        });
    }

    // Default error
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal server error'
    });
};

// 404 Not Found handler
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

module.exports = {
    errorHandler,
    notFound
};
