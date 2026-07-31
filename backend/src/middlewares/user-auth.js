const { verifyToken } = require("../utils/jwt");

async function authenticate(req, res, next) {
    const userUID = req.cookies?.uid;

    try {
        if (!userUID) return res.send("No token");

        const user = verifyToken(userUID);

        if (!user) return res.send('Invalid or expired token')

        req.user = user;
        next();
    }
    catch (err) {
        console.log("Error at authentication ", err.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
}
module.exports = authenticate;