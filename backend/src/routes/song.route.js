const express=require('express');
const router=express.Router();
const Song=require('../models/song.model.js');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {uploadFile} = require('../service/imagekit.service.js');


router.post('/songs', upload.single('audio'), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    const audioUrl = await uploadFile(req.file);
    res.send('Song added'); 
    console.log(audioUrl);    
});


module.exports=router;