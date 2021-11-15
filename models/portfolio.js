var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    portfolioname : String,
    access : String,
    Project : {
        id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
        category : String
    },
    user : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    progress : String,
    duedate : String
})

module.exports = mongoose.model("Comment", commentSchema);