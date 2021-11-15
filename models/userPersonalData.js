var mongoose               = require("mongoose"),
    passportLocalMongoose  = require("passport-local-mongoose")

var userSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    CNIC: String,
    fatherName: String,
    city: String,
    country : String,
    gender : String,
    maritalStatus : String,
    address : String,
    users : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);