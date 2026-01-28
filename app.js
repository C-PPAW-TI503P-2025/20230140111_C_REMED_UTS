const express = require('express');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Selamat datang di API Sistem Perpustakaan',
        endpoints: {
            books: '/api/books',
            borrow: '/api/borrow'
        }
    });
});

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
