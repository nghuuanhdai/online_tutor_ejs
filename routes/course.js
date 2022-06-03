const express = require('express')
const router = express.Router()
const Course = require('../models/course');
const Lecture = require('../models/lecture');

router.get('/', async (req, res)=>{
    const courses = await Course.find({}).exec();
    res.render('pages/course', {
        firebase_api_key: process.env.FIREBASE_PUBLIC_API_KEY,
        firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
        firenase_project_id: process.env.FIREBASE_PROJECT_ID,
        courses: courses.map(course => ({id: course._id.toString(), title: course.title }))
    })
})

router.get('/:id', async (req, res)=>{
    const course = await Course.findById(req.params.id)
    if (course == null)
    {
        res.render('pages/404', {
            firebase_api_key: process.env.FIREBASE_PUBLIC_API_KEY,
            firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
            firenase_project_id: process.env.FIREBASE_PROJECT_ID,
        })
        return
    }
    const lectures = await Lecture.find({courseId: course._id}).exec()

    res.render('pages/course_detail', {
        firebase_api_key: process.env.FIREBASE_PUBLIC_API_KEY,
        firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
        firenase_project_id: process.env.FIREBASE_PROJECT_ID,
        course: {id: course.id, title: course.title, description: course.description },
        profile: req.profile,
        lectures: lectures.map(lecture=>({id: lecture._id.toString(), title: lecture.title }))
    })
})

module.exports = router