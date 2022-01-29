var mongoose = require("mongoose");

var userDetailsSchema = new mongoose.Schema({
<<<<<<< HEAD
    CNIC: String,
=======
>>>>>>> 10c9e96c8cc6640f3fbf10b2de73b2c555ae419e
    city: String,
    country : String,
    gender : String,
    contact : String,
    jobName : String,
    jobExperience : String,
    skills : [

    ],
    about : String,
    User : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        projectname: String,
    },
    assignedTasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
})

module.exports = mongoose.model("UserDetails", userDetailsSchema);