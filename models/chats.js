var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text : String,
    Room : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room"
        },
        roomname: String,
    },
    file : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File"
        },
        Filename: String,
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