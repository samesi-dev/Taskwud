var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text : String,
    postedDate : String,
    PostedTime : String,
    User : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    file : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        },
        filename: String,
    }
})

module.exports = mongoose.model("Comment", commentSchema);