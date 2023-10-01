const mongoose = require("mongoose");
const eventSchedulingSchema = new mongoose.Schema ({
    eventName: {
        type: String,
    },
    eventStatus: {
        type: String
    },
    date:{
        type: String
    },
    year:{
        type: String
    },
    month:{
        type: String
    },
    avatar:{
        type: String
    },
    cloudinary_id: {
        type: String
    },
    time: {
        type: String
    },
    description:{
        type: String
    }
});

module.exports = mongoose.model("events",eventSchedulingSchema);