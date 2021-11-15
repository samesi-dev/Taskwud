// Requiring all the packages
var express  = require("express"),
    router   = express(),
    request  = require('request');

var usercontroller = require('../controllers/usercontroller');
var middleware = require("../middleware");
const user = require("../models/user");

router.get("/", function(req, res){
    res.render("user/index")
})

router.get("/index", function(req, res){
    res.render("user/index")
})

router.get("/contact", function(req, res){
    res.render("user/contact")
})

router.get("/chat", function(req, res){
    res.render("user/chat")
})

router.get("/calender", function(req, res){
    res.render("user/calender")
})

router.get("/employee", function(req, res){
    res.render("user/employees")
})

router.get("/activity", function(req, res){
    res.render("user/activity")
})

router.get("/login", function(req, res){
    res.render("user/login")
})

router.get("/project", function(req, res){
    res.render("user/project")
})

router.get("/project/new", function(req, res){
    res.render("user/newproject")
})

router.get("/organization", function(req, res){
    res.render("user/organization")
})

router.get("/register", function(req, res){
    res.render("user/register")
})

router.post("/register", function(req, res){
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    var options = { 
        url: 'http://localhost:3000/api/user',
        json: true,
        form: data
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = body.message;
            console.log(obj);
            if (obj === true){
                res.redirect("/");
            }
            else{
                res.redirect("/register");
            }
        }
    }
    request.post(options, callback);
})

router.post("/login", function(req, res){
    var data = {
        username: req.body.username,
        password: req.body.password
    }
    var options = { 
        url: 'http://localhost:3000/api/user/login',
        json: true,
        form: data
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = body.message;
            console.log(obj);
            if (obj === true){
                res.redirect("/");
            }
            else{
                res.redirect("/login");
            }
        }
    }
    request.post(options, callback);
})


module.exports = router;