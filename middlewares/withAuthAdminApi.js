const firebaseAdmin = require('firebase-admin');
const Profile = require('../models/profile')

function withAuthApi(req, res, next) {
    const token = req.cookies.firebase_token
    function handleError(err) {
        console.log(err)
        res.status(403).end()
    }
    firebaseAdmin.auth().verifyIdToken(token)
        .then(decodedIdToken => {
            req.context.user = decodedIdToken
            const email = decodedIdToken.email
            Profile.findOne().where('email').equals(email).exec().then(profile=>{
                if (!profile){
                    profile = new Profile({admin: false, email: email})
                    profile.save(err=>{
                        if(err) return handleError(err)
                        req.context.profile = profile
                        handleError('not admin')
                    })
                }
                else {
                    if(!profile.admin) return handleError('not admin')
                    req.context.profile = profile
                    next()
                }
            }, 
            handleError)
        }, handleError)
}

module.exports = withAuthApi