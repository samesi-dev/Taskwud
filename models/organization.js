var mongoose = require("mongoose");
var Projects = require("./project");
var Team = require("../models/team");

var commentSchema = new mongoose.Schema({
    organizationname : String,
    projects : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Projects"
        }
    ],
    teammember: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
})

module.exports = mongoose.model("Room", commentSchema);