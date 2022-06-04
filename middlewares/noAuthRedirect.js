function noAuthRedirect(req, res, next) {
    if(!req.context.profile)
        return res.redirect(307, '/auth/login')
    next()
}

module.exports = noAuthRedirect