const express = require('express')
const router = express.Router()
const Course = require('../models/course');
const Lecture = require('../models/lecture');
const Profile = require('../models/profile');

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

router.post('/users/edit', async (req, res)=>{
    const user = await Profile.findOne({email: req.body.email})
    if(!user)
        return res.status(404).end()
    res.status(200).json({userId: user._id.toString()})
})

router.get('/users', async (req, res)=>{
    if(!req.context.profile?.admin)
        return res.status(403).end()
    
    res.render('pages/users', {
        ...req.context,
    })
})


router.get('/users/:id', async (req, res)=>{
    const profile = await Profile.findById(req.params.id)

    var courses = await Course.find({_id: {$nin: profile.courses }}).exec();
    courses = courses.map(course => ({id: course._id.toString(), title: course.title }))
    const userCourses = await Course.find({_id: {$in: profile.courses }}).exec();

    res.render('pages/user_detail', {
        ...req.context,
        user: {id: profile._id.toString(), admin: profile.admin, email: profile.email},
        courses: courses,
        userCourses: userCourses
    })  
})


router.post('/users/:id/addcourse', async (req, res)=>{
    const user = await Profile.findById(req.params.id)
    if(!user)
        return res.status(404).end()
    const course = await Course.findById(req.body.courseId)
    if(!course)
        return res.status(404).end()
    user.courses.push(course._id)
    user.courses = Object.values(user.courses.reduce((acc, ele, index)=>{acc[ele.toString()] = ele; return acc}, {}))
    await user.save()
    res.status(200).json({userId: user._id.toString()})
})

router.post('/users/:id/removecourse', async (req, res)=>{
    const user = await Profile.findById(req.params.id)
    if(!user)
        return res.status(404).end()
    const course = await Course.findById(req.body.courseId)
    if(!course)
        return res.status(404).end()
    user.courses = user.courses.filter(c=>c.toString()!==course._id.toString())
    await user.save()
    res.status(200).json({userId: user._id.toString()})
})

module.exports = router