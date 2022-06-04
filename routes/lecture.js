const express = require('express')
const Course = require('../models/course')
const mongoose = require('mongoose')
const Lecture = require('../models/lecture')
const LectureMileStone = require('../models/lectureMilestone')
const UserLectureMilestone = require('../models/userLectureMilestone')
const router = express.Router()

router.get('/:id', async (req, res)=>{
    const lecture = await Lecture.findById(req.params.id)
    const course = await Course.findById(lecture.courseId)
    const canAccess = (req.context.profile?.courses.filter(c => c.toString()=== course._id.toString()).length??0 > 0) || (req.context.profile?.admin??false)
    if(!canAccess)
    {
        return res.redirect(307, '/')
    }

    if (lecture == null)
    {
        res.render('pages/404', {
            ...req.context,
        })
        return
    }

    const milestones = await LectureMileStone.find({lectureId: lecture._id}).exec()
    const userMilestonesData = await UserLectureMilestone.find({profileId: req.context.profile._id, milestoneId: {$in : milestones.map(m => m._id)}}).exec()
    const milestoneData = milestones.map(m => ({
        id: m._id.toString(),
        text: m.text,
        checked: userMilestonesData.find(e => e.milestoneId.toString() === m._id.toString())?.checked??false
    }))

    res.render('pages/lecture_detail', {
        ...req.context,
        lecture: {id: lecture.id, title: lecture.title, description: lecture.description, videoId: lecture.videoId},
        course: {id: course._id.toString(), title: course.title },
        milestoneData: milestoneData
    })
})

router.post('/:id/usermilestone', async (req, res)=>{
    const lecture = await Lecture.findById(req.params.id)
    if(!lecture)
        res.status(404).end()
    var usermilestone = await UserLectureMilestone.findOne({profileId: req.body.userId, milestoneId: req.body.milestoneId})
    if(!usermilestone)
        usermilestone = new UserLectureMilestone({ 
            milestoneId: mongoose.Types.ObjectId(req.body.milestoneId),
            profileId: mongoose.Types.ObjectId(req.body.userId),
        })
    usermilestone.checked = req.body.checked
    await usermilestone.save()
    res.status(200).end()
})

module.exports = router