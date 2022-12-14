var mongoose               = require("mongoose"),
    passportLocalMongoose  = require("passport-local-mongoose")

var userSchema = new mongoose.Schema({
    email: String,
    username: String,
    designation: String, 
    salt : String,
    hash : String
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);