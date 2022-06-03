var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    title: String,
    description: String,
});


var Course = mongoose.model('Course', CourseSchema)
module.exports = Course