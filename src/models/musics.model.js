const mongoose = require('mongoose');

const musicSChema = new mongoose.Schema({
    uri: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    
        required: true
    } 
});


const Musics = mongoose.model('Music', musicSChema);

module.exports = Musics;