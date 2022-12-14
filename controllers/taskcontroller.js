// requiring all dependencies
var express           = require("express"),
    router            = express(),
    passport          = require('passport');
    // GoogleStrategy    = require('passport-google-oauth').OAuth2Strategy,
    // FacebookStrategy  = require('passport-facebook').Strategy;
// Import User model
var User = require('../models/user');
var Task = require("../models/task");
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

// Handle create Task actions
exports.new = function (req, res) {
    console.log(req.body);
    // Task.create({
    //     taskname : req.body.taskname,
    //     instruction : req.body.instruction,
    //     status : "0",
    //     totalhours : req.body.totalhours,
    // }, function (err, task) {
    //     if (err){
    //         res.json({
    //             message: false
    //         });
    //     }            
    //     else {
    //         var objs = req.body.users;
    //         objs.forEach(function(obj){
    //             console.log(obj);
    //             User.findOne({email : obj.toString()}, function(err, user){
    //                 console.log(user);
    //                 task.projectmember.push(user);
    //                 task.save();
    //             })
    //         });     
    //         res.json({
    //             status: true,
    //             message: "successfully created task"
    //         });
    //     }
    // });
};

// Handle login action
exports.login = function (req, res, next) {
    passport.authenticate("local")(req, res, function(){
        if (req.isAuthenticated()){
            res.json({
                message: true
            });
        }
        else
            res.json({
                message: false
            });
    }
    );
};

// Handle view User info
exports.view = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

// Handle update User info
exports.update = function (req, res) {
    User.findByIdAndUpdate(req.params.id,{
        username : req.body.username,
        email : req.body.email
    } , function(err, updateduser){
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
        },
        res.redirect("/api/user/" + req.params.id)
        );
    });
};
// Handle delete User
exports.delete = function (req, res) {
    User.deleteOne({
        _id: req.params.id
    }, function (err, User) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        },
        res.redirect("/api/user")
        );
    });
};