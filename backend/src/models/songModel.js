const mongoose = require("mongoose");

const songs= new mongoose.Schema({
    name:{
        type:String,   
        required:true
    },
    artist:{   
        type:String,   
        required:true
    },
    mood:{
        type:String,   
        required:true
    },
    url:{
        type:String,   
        required:true
    }
})
const Song = module.exports = mongoose.model('Song', songs);