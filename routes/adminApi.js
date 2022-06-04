const express = require('express')
const router = express.Router()
const Course = require('../models/course');
const Lecture = require('../models/lecture')

router.post('/course/create', async (req, res)=>{
    const newCourse = new Course({title: req.body.title})
    await newCourse.save()
    res.status(200).end()
})

router.post('/course/:id/update', async (req, res)=>{
    const course = await Course.findById(req.params.id)
    if(!course)
        return res.status(404).end()
    course.title = req.body.title
    course.description = req.body.description
    await course.save()
    res.status(200).end()
})

router.post('/course/:id/lecture/create', async (req, res)=>{
    const course = await Course.findById(req.params.id)
    if(!course)
        return res.status(404).end()
    const newLecture = new Lecture({ title: req.body.title, courseId: course._id })
    const rs = await newLecture.save()
    res.status(200).end()
})

router.post('/lecture/:id/update', async (req, res)=>{
    const lecture = await Lecture.findById(req.params.id)
    if(!lecture)
        return res.status(404).end()
    lecture.title = req.body.title
    lecture.description = req.body.description
    await lecture.save()
    res.status(200).end()
})

module.exports = router