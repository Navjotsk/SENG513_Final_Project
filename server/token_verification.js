
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET || "123");
        req.tokenData = { id: decodedToken.id, email: decodedToken.email }
        next();
    } catch {
        res.status(401).json({
            error: "Authorization needed"
        });
    }
};