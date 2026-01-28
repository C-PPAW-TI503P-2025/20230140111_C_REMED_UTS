/**
 * Middleware untuk simulasi autentikasi berbasis header
 */

// Middleware untuk memverifikasi role admin
const requireAdmin = (req, res, next) => {
    const userRole = req.headers['x-user-role'];

    if (!userRole) {
        return res.status(403).json({
            success: false,
            message: 'Header x-user-role diperlukan'
        });
    }

    if (userRole !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Akses ditolak. Hanya admin yang dapat mengakses endpoint ini'
        });
    }

    req.userRole = userRole;
    next();
};

// Middleware untuk memverifikasi role user
const requireUser = (req, res, next) => {
    const userRole = req.headers['x-user-role'];
    const userId = req.headers['x-user-id'];

    if (!userRole) {
        return res.status(403).json({
            success: false,
            message: 'Header x-user-role diperlukan'
        });
    }

    if (!userId) {
        return res.status(403).json({
            success: false,
            message: 'Header x-user-id diperlukan'
        });
    }

    if (userRole !== 'user') {
        return res.status(403).json({
            success: false,
            message: 'Akses ditolak. Hanya user yang dapat mengakses endpoint ini'
        });
    }

    req.userRole = userRole;
    req.userId = parseInt(userId);
    next();
};

module.exports = {
    requireAdmin,
    requireUser
};
