var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    taskbame : String,
    instruction : String,
    status : String,
    totalhours : String,
    Project : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        projectname: String,
    },
    projectmember : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
})

module.exports = mongoose.model("Comment", commentSchema);