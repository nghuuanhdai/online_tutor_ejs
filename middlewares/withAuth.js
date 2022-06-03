const firebaseAdmin = require('firebase-admin');
const Profile = require('../models/profile')

function withAuth(req, res, next) {
    const token = req.cookies.firebase_token
    function handleError(err) {
        console.log(err)
        res.redirect(307, '/auth/login')
    }
    firebaseAdmin.auth().verifyIdToken(token)
        .then(decodedIdToken => {
            req.user = decodedIdToken
            const email = decodedIdToken.email
            Profile.findOne().where('email').equals(email).exec().then(profile=>{
                if (!profile){
                    profile = new Profile({admin: false, email: email})
                    profile.save(err=>{
                        if(err) return handleError(err)
                        req.profile = profile
                        next()
                    })
                }
                else {
                    req.profile = profile
                    next()
                }
            }, 
            handleError)
        }, handleError)
}

module.exports = withAuth