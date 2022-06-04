const express = require('express')
const router = express.Router()
const Course = require('../models/course');
const Lecture = require('../models/lecture');

router.get('/', async (req, res)=>{
    var courses = await Course.find({}).exec();
    courses = courses.map(course => ({id: course._id.toString(), title: course.title }))
    const myCourses = courses;
    res.render('pages/course', {
        ...req.context,
        courses: courses,
        myCourses: myCourses
    })
})

router.get('/:id', async (req, res)=>{
    const course = await Course.findById(req.params.id)
    if (course == null)
    {
        res.render('pages/404', {
            ...req.context,
        })
        return
    }
    const lectures = await Lecture.find({courseId: course._id}).exec()

    res.render('pages/course_detail', {
        ...req.context,
        course: {id: course.id, title: course.title, description: course.description },
        lectures: lectures.map(lecture=>({id: lecture._id.toString(), title: lecture.title }))
    })
})

module.exports = router