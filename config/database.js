const mongoose = require("mongoose");

const DATABASE = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DATABASE);
        console.log(`database Connected`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;