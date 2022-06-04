function noAdminForbidden(req, res, next) {
    if(!req.context.profile?.admin)
        return res.status(403).end()
    next()
}

module.exports = noAdminForbidden