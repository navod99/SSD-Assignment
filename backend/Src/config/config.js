const mongoose = require("mongoose");
//to get packages and assign into variables.

const URI = "mongodb+srv://Seran:nAvindu%4099@cluster0.di265hu.mongodb.net/test";

const connectDB = async () => {
    await mongoose.connect(URI);
    console.log("Database Connected");
    
}


module.exports = connectDB;