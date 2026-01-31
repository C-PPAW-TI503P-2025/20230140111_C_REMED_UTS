require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');
const seedAdmin = require('./config/seedAdmin');

const PORT = process.env.PORT || 3000;

// Test database connection and sync models
const startServer = async () => {
    try {
        // Test connection
        await sequelize.authenticate();
        console.log('✓ Database connection established successfully');

        // Sync models (create tables if not exist)
        await sequelize.sync({ alter: false });
        console.log('✓ Database models synchronized');

        // Seed default admin user
        await seedAdmin();

        // Start server
        app.listen(PORT, () => {
            console.log(`✓ Server running on port ${PORT}`);
            console.log(`✓ API URL: http://localhost:${PORT}`);
            console.log('\nAvailable endpoints:');
            console.log('  POST   /api/auth/register   - Register user');
            console.log('  POST   /api/auth/login      - Login (admin/user)');
            console.log('  GET    /api/books          - Get all books (Public)');
            console.log('  GET    /api/books/:id      - Get book by ID (Public)');
            console.log('  POST   /api/books          - Create book (Admin)');
            console.log('  PUT    /api/books/:id      - Update book (Admin)');
            console.log('  DELETE /api/books/:id      - Delete book (Admin)');
            console.log('  POST   /api/borrow         - Borrow book (User)');
        });
    } catch (error) {
        console.error('✗ Unable to start server:', error);
        process.exit(1);
    }
};

startServer();
