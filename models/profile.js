var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    admin: Boolean,
    email: {type: String, unique: true, index: true},
    courses: [mongoose.ObjectId]
});


var Profile = mongoose.model('Profile', ProfileSchema)
module.exports = Profile