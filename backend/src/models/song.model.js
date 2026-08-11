const mongoose = require("mongoose");

const songs= new mongoose.Schema({
    title:{
        type:String,   
        required:true
    },
    artist:{   
        type:String,   
        required:true
    },
    audio:{
        type:String,   
        required:true
    },
    mood:{
        type:String,
        required:true
    }
})
const Song = module.exports = mongoose.model('Song', songs);