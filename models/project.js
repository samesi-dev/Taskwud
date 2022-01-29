var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
    projectname : String,
    filetype : String,
    startDate : String,
    startTime : String,
    endDate : String,
    endTime : String,
    category : String,
    budget : String,
    description : String,
    projectcreated: String,
    projectteam : [
        
    ],
    projectManager : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
})

module.exports = mongoose.model("Project", projectSchema);