const express = require('express')
const router = express.Router()

router.get('/login', (req, res)=>{
    res.render('pages/login', {
        ...req.context,
    })
})

router.get('/reset-pass', (req, res)=>{
    res.render('pages/reset_password', {
        ...req.context,
    })
})

router.get('/logout', (req, res)=>{
    res.send('Logout')
})

module.exports = router