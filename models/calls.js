var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    type : String,
    duration : String,
    recordings : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recording"
        }
    ],
    Room : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        },
        roomname: String,
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