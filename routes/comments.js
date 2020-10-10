var express = require("express");
var router  = express.Router({mergeParams: true});
var New = require("../models/new");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find new by id
    console.log(req.params.id);
    New.findById(req.params.id, function(err , news){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {news : news});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup new using ID
   New.findById(req.params.id, function(err, news){
       if(err){
           console.log(err);
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               news.comments.push(comment);
               news.save();
               console.log(comment);
               res.redirect('/new/' + news._id);
           }
        });
       }
   });
});
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {new_id: req.params.id, comment: foundComment});
      }
   });
});
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/new/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/new/" + req.params.id);
       }
    });
});

module.exports = router;