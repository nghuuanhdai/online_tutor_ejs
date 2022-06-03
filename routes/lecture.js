const express = require('express')
const Lecture = require('../models/lecture')
const router = express.Router()

router.get('/:id', async (req, res)=>{
    const lecture = await Lecture.findById(req.params.id)
    if (lecture == null)
    {
        res.render('pages/404', {
            firebase_api_key: process.env.FIREBASE_PUBLIC_API_KEY,
            firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
            firenase_project_id: process.env.FIREBASE_PROJECT_ID,
        })
        return
    }

    res.render('pages/lecture_detail', {
        firebase_api_key: process.env.FIREBASE_PUBLIC_API_KEY,
        firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
        firenase_project_id: process.env.FIREBASE_PROJECT_ID,
        lecture: {id: lecture.id, title: lecture.title, description: lecture.description, videoId: lecture.videoId},
        profile: req.profile
    })
})

module.exports = router