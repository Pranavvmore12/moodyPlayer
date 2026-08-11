const express= require('express');
const app= express();
const songRoutes= require('./routes/song.route.js');
app.use(express.json());
app.use('/', songRoutes);


module.exports= app;