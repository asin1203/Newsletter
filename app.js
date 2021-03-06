var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    New = require("./models/new"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds")

//requiring routes
var commentRoutes = require("./routes/comments"),
    NewRoutes = require("./routes/new"),
    indexRoutes = require("./routes/index")

//Password Hidden     
mongoose.connect('mongodb://localhost/Newsletter', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());



app.use(require("express-session")({
    secret: "blah-blah",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use(NewRoutes);
app.use("/new/:id/comments", commentRoutes);


app.listen(process.env.PORT || 3000, function () {
    console.log("Port is running!");
})
