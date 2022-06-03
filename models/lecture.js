var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LectureSchema = new Schema({
    courseId: mongoose.ObjectId ,
    title: String,
    description: String,
    videoId: String
});

var Lecture = mongoose.model('Lecture', LectureSchema)
module.exports = Lecture