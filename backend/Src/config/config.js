const mongoose = require("mongoose");
require('dotenv').config()
//to get packages and assign into variables.


const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");

}


module.exports = connectDB;