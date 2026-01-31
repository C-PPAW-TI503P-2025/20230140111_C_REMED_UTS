const { User } = require('../models');

/**
 * Register new user
 */
const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username sudah digunakan'
            });
        }

        // Create new user (password will be hashed automatically by model hook)
        const user = await User.create({
            username,
            password,
            role: 'user' // Default role is user
        });

        // Don't send password in response
        const userResponse = {
            id: user.id,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt
        };

        res.status(201).json({
            success: true,
            message: 'Registrasi berhasil! Silakan login.',
            data: userResponse
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Login user or admin
 */
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username dan password wajib diisi'
            });
        }

        // Find user
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Username atau password salah'
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Username atau password salah'
            });
        }

        // Login successful
        res.status(200).json({
            success: true,
            message: 'Login berhasil!',
            data: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};
