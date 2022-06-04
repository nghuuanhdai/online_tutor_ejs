var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LectureMileStoneSchema = new Schema({
    lectureId:{type: mongoose.ObjectId, ref: 'Lecture' },
    text: String
});

var LectureMileStone = mongoose.model('Milestone', LectureMileStoneSchema)
module.exports = LectureMileStone