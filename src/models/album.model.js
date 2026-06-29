const mongoose = require('mongoose');

const AlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    musics: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Music'
    }],
    Artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})
const Album = mongoose.model('album', AlbumSchema);

module.exports = Album;