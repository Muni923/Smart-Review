const { verifyToken } = require("../utils/jwt");

async function authenticate(req, res) {
    const userUID = req.cookies?.uid;

    try {
        if (!userUID) return res.json({
            message: "No token",
            success: false
        });

        const user = verifyToken(userUID);

        if (!user) return res.send({
            message: "INVALID or EXPIRED Token",
            success: false
        })

        req.user = user;
        res.json({
            "success": true,
            "name":user.username
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