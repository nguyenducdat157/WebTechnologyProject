const path = require('path')
const multer = require('multer')

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        let ext = file.originalname.replace(/\s/g, '');
        cb(null, ext)
    }
})

const upload = multer ({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if(
            file.mimetype === 'image/png' || 
            file.mimetype === 'image/jpg'
        ){
            callback(null, true)
        } else {
            console.log('Only jpg & png file supported!')
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
})

module.exports = upload