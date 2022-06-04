var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserLectureMilestoneSchema = new Schema({
    milestoneId: {type: mongoose.ObjectId, ref: 'Milestone' },
    profileId: {type: mongoose.ObjectId, ref: 'Profile' },
    checked: Boolean
});
UserLectureMilestoneSchema.index({ milestoneId: 1, profileId: 1 }, {unique: true})
var UserLectureMilestone = mongoose.model('UserMilestone', UserLectureMilestoneSchema)
module.exports = UserLectureMilestone