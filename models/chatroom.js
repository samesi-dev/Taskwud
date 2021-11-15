var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    name : String,
    users : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    files : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Files"
        }
    ],
    messages : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Messages"
        }
    ]
})

module.exports = mongoose.model("Room", commentSchema);