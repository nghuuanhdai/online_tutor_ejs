const express = require('express')
const router = express.Router()
const formidable = require('formidable');
const Lecture = require('../models/lecture');
const Vimeo = require('vimeo').Vimeo

router.post('/lecture/:id/video', async (req, res)=>{
    const lecture = await Lecture.findById(req.params.id)
    if (!lecture)
        return res.status(404).end()
    let form = new formidable.IncomingForm();
    const {err, fields, files} = await new Promise((resolve, reject)=>{
        form.parse(req, (err, fields, files)=> {
            resolve({err, fields, files})
        })
    })
    if(err)
    {
        console.log(err)
        return res.status(500).end()
    }
    const file = files?.video.filepath;
    const video_uri = await vimeoUpload(file, lecture.title);
    const videoId = video_uri.split('/').at(-1)
    lecture.videoId = videoId
    await lecture.save()
    res.status(200).end()
})

function vimeoUpload(file_name, title) {
    return new Promise((resolve, reject)=>{
        let client = new Vimeo(
            process.env.VIMEO_CLI_ID, 
            process.env.VIMEO_CLI_SECR, 
            process.env.VIMEO_ACC_TOKEN
        )
        client.upload(
            file_name,
            {
              'name': title
            },
            function (uri) {
              console.log('Your video URI is: ' + uri);
              resolve(uri);
            },
            function (bytes_uploaded, bytes_total) {
              var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
              console.log(bytes_uploaded, bytes_total, percentage + '%')
            },
            function (error) {
              console.log('Failed because: ' + error);
              reject(error);
            }
        )
    })   
}

module.exports = router