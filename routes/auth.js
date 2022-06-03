const express = require('express')
const router = express.Router()

router.get('/login', (req, res)=>{
    res.render('pages/login', {
        firebase_api_key: process.env.FIREBASE_PUBLIC_API_KEY,
        firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
        firenase_project_id: process.env.FIREBASE_PROJECT_ID
    })
})

router.get('/reset-pass', (req, res)=>{
    res.send('Reset Pass')
})

router.get('/logout', (req, res)=>{
    res.send('Logout')
})

module.exports = router