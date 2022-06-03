require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");

const withAuth = require('./middlewares/withAuth')
const withAuthAdminApi = require('./middlewares/withAuthAdminApi')

const authRoute = require('./routes/auth')
const courseRoute = require('./routes/course')
const lectureRoute = require('./routes/lecture')
const adminApiRoute = require('./routes/adminApi')

const firebaseAdmin = require('firebase-admin');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(
    mongoose=>{
        console.log('database connected')
    },
    err=>{
        console.log(err)
    }
);

const path = require('path')

const app = express()
const port = process.env.PORT || 3000

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(cookieParser());
app.use('/admin', withAuthAdminApi)
app.use('/admin', adminApiRoute)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set("view engine", "ejs")

app.use('/course', withAuth)
app.use('/lecture', withAuth)

app.use('/auth', authRoute)
app.use('/course', courseRoute)
app.use('/lecture', lectureRoute)

app.get('/', (req, res)=> {res.redirect(307, '/course')})

app.listen(port, ()=>console.log('server started'))