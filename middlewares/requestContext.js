function requestContext(req, res, next) {
    req.context = {}
    next()
}

module.exports = requestContext