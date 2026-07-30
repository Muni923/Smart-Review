const mongoose = require('mongoose');
const mongoConnect = async () => {

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/SmartReview');

        console.log("mongodb connected");
    }

    catch (err) {

        console.log("mongodb connection error :", err.message);

    }
}

module.exports = mongoConnect;