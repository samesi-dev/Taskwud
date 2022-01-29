// Requiring all the packages
var express = require("express"),
    router = express.Router({ mergeParams: true }),
    passport = require("passport")

// Requiring the middleware
var middleware = require("../middleware");

var host = "http://localhost:3000/";

// Requiring the models
var User = require("../models/user");
var Org = require("../models/organization");
var Task = require("../models/task");
var Project = require("../models/project");
var UserData = require("../models/userData");

router.get("/", isLoggedIn,function (req, res) {
    User.findById(req.user.id, function(err, findUser){
        if (err) {
            console.log(err);
        }
        else {
            email = findUser.email;
            Project.find({
                "projectManager.id": req.user.id
            }, function (err, findProjects) {
                if (err) {
                    console.log(err);
                }
                else {
                    Task.find({
                        "createdby.id": req.user.id
                    }, function (err, findTasks) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            Org.find({
                                "createdby.id": req.user.id
                            }, function (err, findOrgs) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.render("user/index", { findProjects: findProjects, findTasks: findTasks, findOrgs: findOrgs, header: "Dashboard" });
                                };
                            })
                            
                        };
                    })
                };
            })
        }
    })
    
})

router.get("/index", isLoggedIn,function (req, res) {
    res.redirect("/")
})

router.get("/user-details", isLoggedIn, function (req, res) {
    res.render("user/user-details")
})

router.post("/user-details", isLoggedIn, function (req, res) {
    UserData.create({
        city : req.body.city,
        country : req.body.country,
        gender : req.body.gender,
        contact : req.body.contact,
        jobName : req.body.jobName,
        jobExperience : req.body.jobExperience,
        about : req.body.about,
    }, function (err, userData) {
        if (err) {
            res.redirect("/project/new");
        }
        else {
            userData.User.id = req.user._id;
            userData.User.username = req.user.username;
            var objs = req.body.users;
            objs.forEach(function (obj) {
                userData.skills.push(obj);
            });
            userData.save();
            res.redirect("/");
        }
    });
})

router.get("/user-details/edit", isLoggedIn, function (req, res) {
    UserData.findOne({
        "User.id": req.user.id
    }, function (err, findUserData) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("user/edit-user-details", {findUserData : findUserData});
        };
    }) 
})

router.put("/user-details/:id", isLoggedIn, function (req, res) {
    UserData.findByIdAndUpdate(req.params.id, {
        city : req.body.city,
        country : req.body.country,
        gender : req.body.gender,
        contact : req.body.contact,
        jobName : req.body.jobName,
        jobExperience : req.body.jobExperience,
        about : req.body.about,
    }, function (err, userData) {
        if (err) {
            res.redirect("/user-details/edit");
        }
        else {
            userData.User.id = req.user._id;
            userData.User.username = req.user.username;
            var objs = req.body.users;
            if (objs != null){
                objs.forEach(function (obj) {
                    userData.skills.push(obj);
                });
            }            
            userData.save();
            res.redirect("/profile");
        }
    });
})

router.get("/profile", isLoggedIn ,function (req, res) {
    User.findById(req.user.id, function (err, findUser) {
        if (err) {
            console.log(err);
        }
        else {
            UserData.findOne({
                "User.id": req.user.id
            }, function (err, findUserData) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render("user/app-profile", {findUser : findUser, findUserData : findUserData, header: "Profile"});
                };
            })
        };
    })    
})

router.delete("/profile/:id", isLoggedIn, function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, Project) {
        if (err) {
            res.redirect("/profile");
        }
        else {
            res.redirect("/");
        }
    });
});

router.get("/chat", function (req, res) {
    res.render("user/chat", {header: "Chat"})
})

router.get("/calender", function (req, res) {
    res.render("user/calender", {header: "Calender"})
})

router.get("/employee", function (req, res) {
    res.render("user/employees", {header: "Employees"})
})

router.get("/activity", function (req, res) {
    res.render("user/activity", {header: "Activity"})
})

router.get("/login", function (req, res) {
    res.render("user/login")
})

router.get("/project", isLoggedIn, function (req, res) {
    // Org.find({
        
    // }, function (err, findProjects) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     else {
    //         res.render("user/project", { findProjects: findProjects , header: "Project" });
    //     };
    // }))
    Project.find({
        "projectManager.id": req.user.id
    }, function (err, findProjects) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("user/project", { findProjects: findProjects , header: "Project" });
        };
    })
})

router.post("/project", isLoggedIn, function (req, res) {
    Project.create({
        projectname : req.body.projectname,
        startDate   : req.body.startDate ,
        startTime   : req.body.startTime,
        endDate     : req.body.endDate,
        endTime     : req.body.endTime,
        category    : req.body.category,
        budget      : req.body.budget,
        description : req.body.description
    }, function (err, Project) {
        if (err) {
            res.redirect("/project/new");
        } 
        else {
            var date = new Date();
            Project.projectcreated = date;
            Project.projectManager.id = req.user._id;
            Project.projectManager.username = req.user.username;
            var objs = req.body.users;
            objs.forEach(function (obj) {
                Project.projectteam.push(obj);
            });
            Project.save();
            res.redirect("/project");
        }
    });
})

router.get("/project/new", isLoggedIn ,function (req, res) {
    res.render("user/createproject", {header: "Project"})
})

router.get("/project/:projectID/update", function (req, res) {
    Project.findById(req.params.projectID, function (err, findProject) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("user/updateproject", { Project: findProject });
        };
    })
})

router.get("/project/:projectID", isLoggedIn, function (req, res) {
    Project.findById(req.params.projectID, function (err, findProject) {
        if (err) {
            console.log(err);
        }
        else {
            Task.find({
                "createdby.id": req.user.id
            }, function (err, findTasks) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render("user/viewproject", { findProject: findProject, findTasks: findTasks, header: "Project" });
                };
            })
        };
    })
})

router.put("/project/:projectID", isLoggedIn, function (req, res) {
    Project.findByIdAndUpdate(req.params.projectID, {
        projectname : req.body.projectname,
        startDate   : req.body.startDate ,
        startTime   : req.body.startTime,
        endDate     : req.body.endDate,
        endTime     : req.body.endTime,
        category    : req.body.category,
        budget      : req.body.budget,
        description     : req.body.description,
    }, function (err, Project) {
        if (err) {
            res.redirect(err);
        }
        else {
           
            var objs = req.body.users;
            if (objs != null){
                objs.forEach(function (obj) {
                    Project.projectteam.push(obj);
                });
            }
            Project.save();
            res.redirect("/project");
        }
    });
})

router.delete("/project/:projectID", isLoggedIn, function (req, res) {
    Project.findByIdAndRemove(req.params.projectID, function (err, Project) {
        if (err) {
            res.redirect("/project");
        }
        else {
            res.redirect("/project");
            console.log("Successfully deleted the file.")
        }
    });
});

router.get("/project/:projectId/complete", isLoggedIn, function (req, res) {
    Project.findByIdAndUpdate(req.params.projectId, {
        status: "Completed",
    }, function (err, project) {
        if (err) {
            res.redirect(err);
        }
        else {
            res.redirect("/project");
        }
    });
})

router.get("/task", isLoggedIn, function (req, res) {
    Task.find({
        "createdby.id": req.user.id
    }, function (err, findTasks) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("user/task", { findTasks: findTasks, header: "Task" });
        };
    })
})

router.post("/task", isLoggedIn, function (req, res) {
    Task.create({
        taskname: req.body.taskname,
        instruction: req.body.instruction,
        status: "Pending",
        startDate: req.body.startDate,
        startTime: req.body.startTime,
        endDate: req.body.endDate,
        endTime: req.body.endTime,
    }, function (err, task) {
        if (err) {
            res.redirect("/task/new");
        }
        else {
            task.createdby.id = req.user._id;
            task.createdby.username = req.user.username;
            var objs = req.body.users;
            objs.forEach(function (obj) {
                task.taskmember.push(obj);
            });
            task.save();
            res.redirect("/");
        }
    });
})

router.get("/task/new", isLoggedIn, function (req, res) {
    res.render("user/createtask", {header: "Task"})
})

router.get("/task/:taskID", isLoggedIn, function (req, res) {
    Task.findById(req.params.taskID, function (err, findTask) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("user/updatetask", { findTask: findTask });
        };
    })
})

router.put("/task/:taskId", isLoggedIn, function (req, res) {
    Task.findByIdAndUpdate(req.params.taskId, {
        taskname: req.body.taskname,
        instruction: req.body.instruction,
        status: "Pending",
        startDate: req.body.startDate,
        startTime: req.body.startTime,
        endDate: req.body.endDate,
        endTime: req.body.endTime,
    }, function (err, task) {
        if (err) {
            res.redirect(err);
        }
        else {
            task.createdby.id = req.user._id;
            task.createdby.username = req.user.username;
            var objs = req.body.users;
            if (objs != null){
                objs.forEach(function (obj) {
                    task.taskmember.push(obj);
                });
            }
            task.save();
            res.redirect("/task");
        }
    });
})

router.delete("/task/:taskID", isLoggedIn, function (req, res) {
    Task.findByIdAndRemove(req.params.taskID, function (err, Org) {
        if (err) {
            res.redirect("/task");
        }
        else {
            res.redirect("/task");
            console.log("Successfully deleted the file.")
        }
    });
});

router.get("/task/:taskId/complete", isLoggedIn, function (req, res) {
    Task.findByIdAndUpdate(req.params.taskId, {
        status: "Completed",
    }, function (err, task) {
        if (err) {
            res.redirect(err);
        }
        else {
            res.redirect("/task");
        }
    });
})

router.get("/organization/new", isLoggedIn, function (req, res) {
    res.render("user/neworganization", {header: "Organization"})
})


router.get("/organization/:id/view", isLoggedIn, function (req, res) {
    Org.findById(req.params.id, function (err, FindOrg) {
        if (err) {
            console.log("Error");
        }
        else {
            Project.find({
                "projectManager.id": req.user.id
            }, function (err, findProjects) {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render("user/vieworganization", { Org: FindOrg, findProjects: findProjects, header: "Organization" });
                };
            })
            
        }
    });
})


router.get("/organization/:id/update", function (req, res) {
    Org.findById(req.params.id, function (err, FindOrg) {
        if (err) {
            console.log("Error");
        }
        else {
            res.render("user/updateorganization", { Org: FindOrg, header: "Organization"});
        }
    });
})

router.put("/organization/:id", isLoggedIn, function (req, res) {
    var org = {
        orgname: req.body.orgname,
        orgdescription: req.body.orgdescription,
        orgaddress: req.body.orgaddress,
        orgnumber: req.body.orgnumber,
        orgcontact: req.body.orgcontact,
        orgemail: req.body.orgemail,

    }
    Org.findByIdAndUpdate(req.params.id, org, function(err, newOrg){
        if(err){
            console.log(err);
        }
        else{ 
            newOrg.createdby.id = req.user._id;
            newOrg.createdby.username = req.user.username;
            var objs = req.body.users;
            if (objs != null){                    
                objs.forEach(function (obj) {
                    newOrg.orgmember.push(obj);
                });
            }      
            newOrg.save();
            res.redirect("/organization");
        }
    });
});

router.get("/organization", isLoggedIn, function (req, res) {
    Org.find({"orgmember" : { $in : [email]  } }, function (err, findOrgs) {
        if (err) {
            console.log(err);
        }
        else {
            findOrgs.forEach(function(findOrg){
                console.log(findOrg);
            })  
            
            res.render("user/organization", { findOrgs: findOrgs , header: "Organization"});
        };
    })
})


router.delete("/organization/:id", isLoggedIn, function (req, res) {
    Org.findByIdAndRemove(req.params.id, function (err, Org) {
        if (err) {
            res.redirect("/user/vieworganization");
        }
        else {
            res.redirect("/organization");
            console.log("Successfully deleted the file.")
        }
    });
});

router.post("/organization", isLoggedIn, function (req, res) {
    var org = {
        orgname: req.body.orgname,
        orgdescription: req.body.orgdescription,
        orgaddress: req.body.orgaddress,
        orgcontact: req.body.orgcontact,
        orgemail: req.body.orgemail,
    }
    Org.create(org, function (err, newOrg) {
        if (err) {
            console.log("error");
        }
        else {
            var date = new Date();
            newOrg.orgcreated = date;
            newOrg.createdby.id = req.user._id;
            newOrg.createdby.username = req.user.username;
            var objs = req.body.users;
            var i = 0;
            objs.forEach(function (obj) {
                i++
                newOrg.orgmember.push(obj);
            });
            console.log(i);
            newOrg.orgnumber = JSON.stringify(i);
            newOrg.save();
            res.redirect("/organization");
        }
    })
})

router.get("/register", function (req, res) {
    res.render("user/register")
})

router.get("/emoji", function (req, res) {
    res.render("user/emoji")
})

router.post("/search", function (req, res) {
    let hint = "";
    let response = "";
    let searchQ = req.body.query.toLowerCase();
    if (searchQ.length > 0) {
        User.find(function (err, users) {
            if (err) {
                console.log(err);
            }
            else {
                users.forEach(function (user) {
                    if (user.email.indexOf(searchQ) != -1) {
                        if (hint === "") {
                            hint = "<a href='javascript:;'>" + user.email + "</a>";
                        }
                        else {
                            hint = hint + "<br><br><a href='javascript:;'>" + user.email + "</a>";
                        }
                    }
                })
            }
            if (hint === "") {
                response = "no response";
            }
            else {
                response = hint;
            }
            res.send({ response: response })
        });
    }
})

router.post("/register", function (req, res) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        designation : req.body.designation
    }), req.body.password, function (err, user) {
        if (err) {
            res.redirect("/register")
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/user-details");
            });
        }
    });
})

router.post("/login", function (req, res) {

    passport.authenticate("local")(req, res, function () {
        if (req.isAuthenticated()) {
            res.redirect("/");
        }
        else
            res.redirect("/login");
    }
    );
})

router.get('/logout', function (req, res) {
    req.logOut();
    res.redirect('/');
    
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;