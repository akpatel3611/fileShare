
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const file = require('../Models/file');
const {v4: uuidv4} = require('uuid');
const { error } = require('console');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}
        ${path.extname(file.originalname)}`;
        cb(null, uniqueName);

    }
})

let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 },
}).single('myfile');

router.post('/',(req, res) => {
//store files 
   upload(req, res, async(err) => {
// validate request 
  if (!req.file) {
    return res.json({ error: 'All field are required,' });
    }

   if (err) {
  return res.status(500).send({ error: err.message });
}
// Store The database
   const file = new file({
    filename: req.file.filename,
    uuid: uuid4(),
    path: req.file.path,
    size: req.file.size
});
 const response= await file.save();
 return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
 // http://localhost:3000/files/e834884kdf94-4kfgi8r94kldf8
});

});
 router.post('/send',async(req , res)=>{
    const {uuid,emailTo,emailFromo} = req.body;
   //validate request
   if(!uuid || !emailTo || !emailFrom){
    return res.status(422).send({error: 'All field are required'});
    }

    // Get data from database

    const file = await File.findOne({uuid: uuid});
    if(file.sender){
        return res.status(404).send({error: 'Email already send'});
    }
    
    file.sender = emialFrom;
    file.receiver = emailTo;
    const response = await file.save();
  
    // Send email
     const sendMail = require ('../services/emailService');
     sendMail({
        from: emailFrom,
        to: emailTo,
        subject: 'inShare File Sharing',
        text: `${emailFrom} sent you a file via inShare`,
        html: require('../services/emailTemplate')({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000) + 'KB',
            expires: '24 hours',

        })
     });
     return res.send({success: true});
 });

module.exports = router;