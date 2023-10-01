const mongoose = require("mongoose");

const boardMembersSchema = new mongoose.Schema({
    boardMemberName: { 
        type: String
    },
    designation:{
        type:String
    },
    year:{
        type:String
    },
    description:{
        type:String
    },
    avatar:{
        type: String
    },
    cloudinary_id: {
        type: String
    },
});

module.exports = mongoose.model("boardMembers",boardMembersSchema);