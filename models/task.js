var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    taskname : String,
    instruction : String,
    status : String,
    startDate : String,
    startTime : String,
    endDate : String,
    endTime : String,
    createdby: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    Project : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        projectname: String,
    },
    taskmember : [
        
    ]
})

module.exports = mongoose.model("Task", taskSchema);