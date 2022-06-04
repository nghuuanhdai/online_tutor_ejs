function clientEnvVars(req, res, next) {
    req.context.firebase_api_key = process.env.FIREBASE_PUBLIC_API_KEY;
    req.context.firebase_auth_domain = process.env.FIREBASE_AUTH_DOMAIN;
    req.context.firenase_project_id = process.env.FIREBASE_PROJECT_ID;
    req.context.cloudinary_cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
    req.context.cloudinary_upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET;
    next()
}

module.exports = clientEnvVars