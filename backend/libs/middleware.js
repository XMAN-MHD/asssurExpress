import jwt from 'jsonwebtoken';

// Handle errors
export const errorHandler = (err, req, res, next) => {
    const defaultMessage = "Nous avons des problémes techniques. Merci de réessayer plus tard.";
    const { status, message, error } = err;
    if (error) {
        console.log(error);
    }
    res.status(status).json({ message: message || defaultMessage });
};

// Protect routes with authentication
export const verifyToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

    // If no token, user is not authorized
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({ message: 'Access Forbidden' });
        }
        req.user = user;
        next();
    });
};
