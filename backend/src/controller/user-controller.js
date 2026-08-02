const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt')

const Signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;


        if (!email || !password || !username) {
            return res.status(400).json({ message: "All fields compulsary" })
        }
        const isAlreadyExistingEmail = await User.findOne({ email });

        if (isAlreadyExistingEmail) {
            res.status(409).json({
                message: "Account Exists Already"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "user added successfully"
        })

    }
    catch (err) {
        console.log("error at user controller :", err.message);

    }

}

const Login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields compulsory"
            })
        }

        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });

        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const token = generateToken(user);
        res.cookie("uid", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });

        return res.status(201).json({
            success: true,
            message: "Login successful"
        })

    }
    catch (err) {
        console.log("error at user controller :", err.message);
        return res.status(500).json({
            success: false,
            message: err.message

        })
    }

}
const Logout = (req, res) => {
    res.clearCookie("uid");

    return res.status(201).json({
        success: true,
        message: "Logged out successfully"
    });
};

module.exports = { Signup, Login, Logout };