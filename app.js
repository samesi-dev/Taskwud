// Requiring all the packages

var express           = require("express"),
    app               = express(),
    methodOverride    = require("method-override"),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
    passport          = require("passport")
    LocalStrategy     = require("passport-local")
    multer            = require("multer"),
    flash             = require("connect-flash")

// Requiring all the routes
var indexRoutes       = require("./routes/index");
var apiRoutes         = require("./routes/api-routes");

// Requiring all the models
var User = require('./models/user');

// session getting defined
app.use(require("express-session")({
    secret: "Nothing",
    resave: false,
    saveUninitialized: false,
}));

// Connecting to mongo db database
//mongoose.connect("mongodb://localhost/Taskwud", { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.connect("mongodb+srv://asad:rtaah2004@cluster0.1dkg4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true , useUnifiedTopology: true});

// Enable the app to use different packages
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride("_method"));

// using session
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

// passport is setting up
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
   
// Set the app view engine
app.set("view engine", "ejs");

// Enable the app to use the routes
app.use("/", indexRoutes);
app.use("/api", apiRoutes);

// Enable the app to listen to the port to run on the localhost as well as on the server
app.listen(process.env.PORT || 443, function(){
  
    console.log("The server has started");
})