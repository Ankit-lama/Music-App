const ImageKit = require('@imagekit/nodejs');

const imagekit = new ImageKit({
     privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function uplodefile(file){
    console.log("upload function running...");
    const result = await imagekit.files.upload({
        file,
        fileName:'music_'+ Date.now(),
        folder:'playlist/music'
    })
    return result;
}

module.exports = uplodefile;