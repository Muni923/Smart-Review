const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
};