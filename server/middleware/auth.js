const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');

const authMiddleWare = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ msg: "No Auth token, access denied!" });
        }
        const verified = jwt.verify(token, JWT_KEY);
        if (!verified) {
            return res.status(401).json({ msg: "Token verification failed! Authorization denied!" });
        }

        req.user = verified.id;
        req.token = token;
        next();
    } catch(e) {
        res.status(500).json({ err: e.message });
    }
}

module.exports = authMiddleWare;