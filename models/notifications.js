var mongoose   = require("mongoose");

var notifySchema = new mongoose.Schema({
    senderID : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    type : String,
    read : Boolean,
    createdAt : String,
    Content : String,
    recieverID : {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    }
})

module.exports = mongoose.model("notification", notifySchema);