const musicmodel = require('../models/musics.model')
const albumModel = require('../models/album.model')
const uploadfile = require('../services/storage.service');

async function createMusic(req, res){
    //create music
    const {uri, title} = req.body;
    const file = req.file
    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const result =await uplodefile(file.buffer.toString('base64'));
    const music = await musicmodel.create({
        uri: result.url,
        title,
        artist: decode.id
    })
    res.status(201).json({ message: 'Music created successfully', 
        id: music._id, 
        uri: result.url ,
        title:music.title, 
        artist: req.user.id });
}
async function createAlbum(req, res){
    //create album
    const {title, musicIds} = req.body;
    const Album = await albumModel.create({
        title: title,
        artist: req.user.id,
        musics: musicIds
    });
    res.status(201).json({ message: 'Album created successfully',
            title: title,
            artist: req.user.id,
            Musics: musicIds
         });
}
async function getAllMusics(req, res){
    const musics = await musicmodel.find();
    res.status(200).json({
        message:'Musics fetched successfully',
        musics: musics
    });
}
async function getAllAlbums(req, res){
    const albums = await albumModel.find().select('title artist Musics');
    res.status(200).json({
        message: 'Albums fetched successfully',
        albums: albums
    });
}
async function getAlbumById(req, res){
    const albumId = req.params.albumId;
    const album = await albumModel.findById(albumId).populate('Musics');
    res.status(200).json({
        message: 'Album fetched successfully',
        albums: albums
    });
}

module.exports = {createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById}