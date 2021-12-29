var mongoose = require("mongoose");

var organizationSchema = new mongoose.Schema({
    orgname : String,
    orgdescription : String,  // for org details
    orgaddress : String,
    orgnumber : String,   // for org total no. of employees
    orgcontact : String,   // for org contact
    orgemail : String,   //org email
    orgcreated: String,
    createdby: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
    orgmember : [
        
    ]
})

module.exports = mongoose.model("Org", organizationSchema);