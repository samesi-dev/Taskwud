// Import organization model
var Org = require('../models/organization');
// Handle index actions
exports.index = function (req, res) {
    Org.find(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Organization retrieved successfully",
            data: users
        });
    });
};

// Handle create organization actions
exports.new = function (req, res) {
    Org.create(new Org({
        orgname : req.body.orgname,
        orgdescription : req.body.orgdescription,
        orgaddress : req.body.orgaddress,
        orgnumber : req.body.orgnumber,
        orgcontact : req.body.orgcontact,
        orgemail : req.body.orgemail,
        orgmember : req.body.orgmember,
       
    }), function(err,Org) {
        if (err)
            res.json(err);
        res.json({
            message: 'New Organization created!',
         
        });
    });
};