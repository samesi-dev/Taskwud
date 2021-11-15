var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text : String,
    posteddate : String,
    postedtime : String,
    calls : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Calls"
        }
    ],
    timeline : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Timeliine"
        }
    ],
    replies : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages"
        }
    ],
    Files : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Files"
        },
        filename: String,
    }
})

module.exports = mongoose.model("Comment", commentSchema);