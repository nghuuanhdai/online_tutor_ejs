function requestContext(req, res, next) {
    req.context = {profile: null, user: null}
    next()
}

module.exports = requestContext