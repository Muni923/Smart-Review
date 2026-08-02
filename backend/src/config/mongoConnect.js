const mongoose = require('mongoose');
const {connectURL} = require('./config')
const mongoConnect = async () => {

    try {
        await mongoose.connect(connectURL);

        console.log("mongodb connected");
    }

    catch (err) {

        console.log("mongodb connection error :", err.message);

    }
}

module.exports = mongoConnect;