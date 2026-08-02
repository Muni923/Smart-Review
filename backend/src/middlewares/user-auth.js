const { verifyToken } = require("../utils/jwt");

async function authenticate(req, res) {
    const userUID = req.cookies?.uid;

    try {
        if (!userUID) return res.status(400).json({
            message: "No token",
            success: false
        });

        const user = verifyToken(userUID);

        if (!user) return res.status(401).json({
            message: "INVALID or EXPIRED Token",
            success: false
        })

        req.user = user;
        res.status(200).json({
            "success": true,
            "name": user.username
        })

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