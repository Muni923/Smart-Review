const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt')

const Signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        if (!email || !password || !username) {
            res.send("All fields compulsary")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.send({
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
            res.send("All fields compulsory")
        }

        const user = await User.findOne({
            email
        });

        if (!user) {
            res.send("Invalid Credentials");

        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
            res.send('Invalid credentaials');
        }

        const token = generateToken(user);
        res.cookie('uid', token);

        res.send({
            sucess: true,
            message: "Login successful"
        })

    }
    catch (err) {
        console.log("error at user controller :", err.message);
    }

}
const Logout = (req, res) => {
    res.clearCookie("uid");

    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

module.exports = { Signup, Login, Logout };