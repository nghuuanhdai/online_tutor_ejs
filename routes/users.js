const express = require('express')
const router = express.Router()

router.get('/', async (req, res)=>{
    if(!req.context.profile?.admin)
        return res.status(403).end()
    
    res.render('pages/users', {
        ...req.context,
    })
})

module.exports = router