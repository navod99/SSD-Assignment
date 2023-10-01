const mongoose = require("mongoose");
const Schema = mongoose.Schema
const Projectschema = new Schema({
    name: { type: String, required: true },
    Date: { type: String, required: true },
    Description: { type: String, required: true },
    avatar:{type: String},
    cloudinary_id: {type: String},
})

const Project = mongoose.model('project', Projectschema);
module.exports = Project;