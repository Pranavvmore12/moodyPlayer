const express=require('express');
const router=express.Router();
const Song=require('../models/song.model.js');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const {uploadFile} = require('../service/imagekit.service.js');


router.post('/songs', upload.single('audio'), async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const songDetails = await uploadFile(req.file);
        const addedSong = await Song.create({
            title: req.body.title,
            artist: req.body.artist,
            audio: songDetails.url,
            mood: req.body.mood
        });

        res.json({
            message: 'Song added successfully',
            song: addedSong, 
            imageKitUrl: songDetails.url
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add song', details: error.message });
    }
});

router.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find({
            mood: req.query.mood
        });
        res.status(200).json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch songs', details: error.message });
    }
});


module.exports=router;