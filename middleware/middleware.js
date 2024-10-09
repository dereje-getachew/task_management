const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        // Save the decoded user id to request for use in other routes
        req.user = { id: decoded.id };
        next();
    });
};

module.exports = { checkToken };
