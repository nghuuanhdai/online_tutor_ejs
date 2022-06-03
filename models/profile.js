var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    admin: Boolean,
    email: String
});


var Profile = mongoose.model('Profile', ProfileSchema)
module.exports = Profile