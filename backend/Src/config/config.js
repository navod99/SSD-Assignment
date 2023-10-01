const mongoose = require("mongoose");
//to get packages and assign into variables.

const URI = "mongodb+srv://navx99:uBGk5PplEdjkxCkl@nilwala.djsja5y.mongodb.net/";

const connectDB = async () => {
    await mongoose.connect(URI);
    console.log("Database Connected");
    
}


module.exports = connectDB;