var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    timelinename : String,
    titype : String,
    thread : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Thread"
        }
    ],
    users : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

module.exports = mongoose.model("Room", commentSchema);