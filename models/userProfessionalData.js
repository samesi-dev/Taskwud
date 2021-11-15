var mongoose               = require("mongoose"),
    passportLocalMongoose  = require("passport-local-mongoose")

var userSchema = new mongoose.Schema({
    jobName: String,
    jobDescription: String,
    jobExperience: String,
    hiringdate: String,
    salary : String,
    skills : String,
    bonus : String,
    growth : String,
    remarks : String,
    employeementYears : String,
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
            ref: "Cart"
        }
    ]
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);