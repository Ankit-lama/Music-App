const express = require('express');
const multer = require('multer');
const authMiddelware = require('../middlewares/auth.middelware')
const musicController = require('../controllers/music.controller');
const uplodefile = require('../services/storage.service');


const uplode = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

//APIs
router.post('/create',authMiddelware.authArtist,upload.Single('file') ,musicController.createMusic)
router.post('/album',authMiddelware.authArtist,musicController.createAlbum )
router.get('/getAllMusics',authMiddelware.authUser,musicController.getAllMusics);
router.get('/getAllAlbums',authMiddelware.authUser,musicController.getAllAlbums);
router.get('/getAlbumById',authMiddleware.authUser,musicController.getAlbumById)

module.exports = router;