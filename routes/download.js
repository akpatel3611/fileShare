const router = require('express').Router();
const File = require('../Models/file');


 router.get('/:uuid', async(req , res)=>{
       const file = await File.findOne({uuid: req.params.uuid});
       if(!file) {
        return res.render('download',{error: 'Link has been Expired'});
       }

       const filePath = `${__dirname}/../uploads/${file.filename}`;
       res.download(filePath);
 });

 module.exports= router;