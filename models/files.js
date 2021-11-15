var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    filename : String,
    filetype : String,
    uploadedDate : String,
    uploadedTime : String,
    size : String,
    User : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    Team : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team"
        },
        teamname: String,
    }
})

module.exports = mongoose.model("Comment", commentSchema);