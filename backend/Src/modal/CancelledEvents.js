const mongoose = require("mongoose");
const cancelledEventsSchema = new mongoose.Schema ({
    eventName: {
        type: String,
    },
    date:{
        type: String
    },
    time: {
        type: String
    },
    description:{
        type: String
    }
});

module.exports = mongoose.model("cancelledEvents",cancelledEventsSchema);