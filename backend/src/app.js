const express= require('express');
const app= express();
const song= require('./models/songModel.js');
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.post('/songs',async(req,res)=>{
    await song.create(req.body);
    res.send('Song added');
})


module.exports= app;