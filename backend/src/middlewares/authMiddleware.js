import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_bjurnallab_123');

            // Get user from the token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Token tidak valid, otorisasi gagal' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Otorisasi gagal, token tidak ditemukan' });
    }
};

// Optional: Role-based access control middleware
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role (${req.user?.role || 'Guest'}) tidak diizinkan mengakses resource ini`
            });
        }
        next();
    };
};
