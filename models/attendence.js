var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    datetime : String,
    users : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
})

module.exports = mongoose.model("Room", commentSchema);