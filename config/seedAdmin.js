const { User } = require('../models');

/**
 * Seed default admin user
 */
const seedAdmin = async () => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({ where: { username: 'admin' } });

        if (!adminExists) {
            await User.create({
                username: 'admin',
                password: 'admin123',
                role: 'admin'
            });
            console.log('✓ Default admin user created (username: admin, password: admin123)');
        }

        // Check if user already exists (for "User Mode" demo)
        const userExists = await User.findOne({ where: { username: 'user' } });

        if (!userExists) {
            await User.create({
                username: 'user',
                password: 'user123',
                role: 'user'
            });
            console.log('✓ Default normal user created (username: user, password: user123)');
        }
    } catch (error) {
        console.error('Error seeding admin:', error.message);
    }
};

module.exports = seedAdmin;
