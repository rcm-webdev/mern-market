const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING);
        console.log(`MongoDB connected to ${mongoose.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;