const mongoose = require("mongoose");

const connectToDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected succesfully");
    }catch(e){
        console.error("MongoDB connection failed");
        process.exit();
    }
}

module.exports = connectToDb;