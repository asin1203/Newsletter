var express = require("express");
var app  = express();
var passport = require("passport");
var User = require("../models/user");


app.get("/", function(req, res){
    res.render("news/home.ejs");
});

//Creating new admin
app.get("/new/newadmin", function(req,res){
    res.render("newadmin");
});

app.post("/new/newadmin", function(req, res){
    var newUser = new User({username: req.body.username,
                            email: req.body.email,
                            contact : req.body.contact,
                            admin : true});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/new"); 
        });
    });
});

app.get("/register", function(req, res){
   res.render("register"); 
});

//Creating a admin before hand
// var newUser = new User({username : "Admin",
//                          email : "admin@gmail.com",
//                            contact: "99465",
//                            admin : true});
// var password = "admin";
// User.register(newUser, password, function(err, user){
//  if(err)
//  {
//      console.log(err);
// }else{
//   console.log("created!");
//  }
// });

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username,
                            email: req.body.email,
                            contact : req.body.contact,
                            admin : false});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/new"); 
        });
    });
});


app.get("/login", function(req, res){
   res.render("login"); 
});


app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/new",
        failureRedirect: "/login"
    }), function(req, res){
});


app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/");
});



module.exports = app;