const express = require('express')
const Course = require('../models/course')
const Lecture = require('../models/lecture')
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

    res.render('pages/lecture_detail', {
        ...req.context,
        lecture: {id: lecture.id, title: lecture.title, description: lecture.description, videoId: lecture.videoId},
        course: {id: course._id.toString(), title: course.title }
    })
})

module.exports = router