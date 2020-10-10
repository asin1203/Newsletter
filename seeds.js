var mongoose = require("mongoose");
var New = require("./models/new");
var Comment = require("./models/comment");

var data = [
    {
        name: "Corona Virus Live Updates",
        image: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/1800x1200_virus_3d_render_red_03_other.jpg?resize=*:350px",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Political Updates",
        image: "https://thumbs.dreamstime.com/b/political-news-gold-d-words-dark-digital-background-41801097.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Sport's Update",
        image: "https://blog.feedspot.com/wp-content/uploads/2017/11/sports.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB() {
    //Remove all News
    New.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed News!");
        data.forEach(function (seed) {
            New.create(seed, function (err, news) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added a New");
                    //create a comment
                    Comment.create(
                        {
                            text: "Great and informative",
                            author: "Aastha"
                        }, function (err, comment) {
                            if (err) {
                                console.log(err);
                            } else {
                                news.comments.push(comment);
                                news.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;
