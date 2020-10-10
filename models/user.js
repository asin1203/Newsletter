var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    contact: String,
    admin: Boolean,
    password: String
});

UserSchema.plugin(passportLocalMongoose)

var user = mongoose.model("User", UserSchema);

module.exports = user;