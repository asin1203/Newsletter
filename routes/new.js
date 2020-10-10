var express = require("express");
var app = express();
var New = require("../models/new");
var middleware = require("../middleware");



app.get("/new", function (req, res) {

    New.find({}, function (err, allNews) {
        if (err) {
            console.log(err);
        } else {
            res.render("news/index", { news: allNews });
        }
    });
});

//CREATE - add new New to DB
app.post("/new", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to News array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newNew = { name: name, image: image, description: desc, author: author }
    // Create a new New and save to DB
    New.create(newNew, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to News page
            console.log(newlyCreated);
            res.redirect("/new");
        }
    });
});

//NEW - show form to create new New
app.get("/new/new", middleware.isLoggedIn, function (req, res) {
    res.render("news/new");
});

// SHOW - shows more info about one New
app.get("/new/:id", function (req, res) {
    //find the New with provided ID
    New.findById(req.params.id).populate("comments").exec(function (err, news) {
        if (err) {
            console.log(err);
        } else {
            console.log(news)
            //render show template with that New
            res.render("news/show", { news : news });
        }
    });
});

// EDIT New ROUTE
app.get("/new/:id/edit", middleware.checkNewOwnership, function (req, res) {
    New.findById(req.params.id, function (err, foundNew) {
        if(err)
        console.log("error");
        else
        res.render("news/edit", { news: foundNew });
    });
});

// UPDATE New ROUTE
app.put("/new/:id", middleware.checkNewOwnership, function (req, res) {
    // find and update the correct New
    New.findByIdAndUpdate(req.params.id, req.body.news, function (err, updatedNew) {
        if (err) {
            res.redirect("/new/index");
        } else {
            //redirect somewhere(show page)
            res.redirect("/new/" + req.params.id);
        }
    });
});

// DESTROY New ROUTE
app.delete("/new/:id", middleware.checkNewOwnership, function (req, res) {
    New.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/new");
        } else {
            res.redirect("/new");
        }
    });
});


module.exports = app;

