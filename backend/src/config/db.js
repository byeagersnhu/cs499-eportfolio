// Handles MongoDB connection using Mongoose
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connect using the URI from .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.error("MongoDB connection error: ", error);
        process.exit(1);   // Exit the application if the database fails to connect 
    }
};

module.exports = connectDB;