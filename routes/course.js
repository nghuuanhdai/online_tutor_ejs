const express = require('express')
const router = express.Router()
const Course = require('../models/course');
const Lecture = require('../models/lecture');

router.get('/', async (req, res)=>{
    function transformCourseObject(courses) {
        return courses.map(course => ({id: course._id.toString(), title: course.title, imageUrl: course.thumbnailUrl??'/' }))
    }
    const courses = transformCourseObject(await Course.find({}).exec());
    const myCourses = transformCourseObject(await Course.find({_id: {$in: req.context.profile.courses }}).exec());
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
        course: {id: course.id, title: course.title, description: course.description, imageUrl: course.thumbnailUrl??'/' },
        lectures: lectures.map(lecture=>({id: lecture._id.toString(), title: lecture.title }))
    })
})

module.exports = router