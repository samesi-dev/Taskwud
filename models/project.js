var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    projectbame : String,
    filetype : String,
    startDate : String,
    startTime : String,
    endDate : String,
    endTime : String,
    status : String,
    category : String,
    totalhours : String,
    budget : String,
    remarks : String,
    logo : String,
    User : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        projectname: String,
    },
    projectManager : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
})

module.exports = mongoose.model("Comment", commentSchema);