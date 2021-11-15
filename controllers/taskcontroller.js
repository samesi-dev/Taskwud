// UserController.js
// Import User model
var User = require('../models/user');
// Handle index actions
exports.index = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "users retrieved successfully",
            data: users
        });
    });
};

// Handle create User actions
exports.new = function (req, res) {
    User.register(new User({
        username : req.body.username,
        email : req.body.email
    }), req.body.password, function (err, user) {
        if (err)
            res.json(err);
        res.json({
            message: 'New User created!',
            data: user
        });
    });
};

// Handle view User info
exports.view = function (req, res) {
    User.findById(req.params._id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

// // Handle update User info
// exports.update = function (req, res) {
// User.findById(req.params._id, function (err, user) {
//         if (err)
//             res.send(err);
// User.name = req.body.name ? req.body.name : User.name;
//         User.gender = req.body.gender;
//         User.email = req.body.email;
//         User.phone = req.body.phone;
// // save the User and check for errors
//         User.save(function (err) {
//             if (err)
//                 res.json(err);
//             res.json({
//                 message: 'User Info updated',
//                 data: User
//             });
//         });
//     });
// };
// // Handle delete User
// exports.delete = function (req, res) {
//     User.remove({
//         _id: req.params.User_id
//     }, function (err, User) {
//         if (err)
//             res.send(err);
// res.json({
//             status: "success",
//             message: 'User deleted'
//         });
//     });
// };