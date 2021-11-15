var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    recordingname : String,
    postedDate : String,
    PostedTime : String,
    Duration : String,
    Team : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Projectteam"
        },
        teamname: String,
    },
    User : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
})

module.exports = mongoose.model("Comment", commentSchema);