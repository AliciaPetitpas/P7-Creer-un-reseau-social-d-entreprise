const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (res, file, callback) => {
        if (file.fieldname === "image_post") callback(null, './images/posts/');
        else if (file.fieldname === "image_profil") callback(null, 'images/profils/');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
});

module.exports = multer({ storage: storage });