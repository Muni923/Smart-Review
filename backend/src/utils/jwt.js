const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        email: user.email
    }, JWT_SECRET, {
        expiresIn: 60000*60,
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken,
};