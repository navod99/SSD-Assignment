const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: String, required: true },
    email: { type: String, required: true },
    occupation: { type: String, required: true },
    gender: { type: String, required: true },
    city: { type: String, required: true },
    
})

const User = mongoose.model('User', userSchema);
module.exports = User;