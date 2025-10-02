//calling the env file
require("dotenv").config(); //load .env
const mongoose = require("mongoose");

//now connect with DB
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is connected");
    }catch(err){
        console.error("MongoDB connection failed: ", err.message);
        process.exit(1); //stop the app if DB fails
    }
};

module.exports = connectDB;
