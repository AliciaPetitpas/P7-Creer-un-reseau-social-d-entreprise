const multer = require('multer');
const path = require('path');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

const storage = multer.diskStorage({
    destination: (res, file, callback) => {
        if (file.fieldname === "image_post") callback(null, './images/posts/');
        else if (file.fieldname === "image_profil") callback(null, 'images/profils/');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
        // const name = file.originalname.split(' ').join('_');
        // const extension = MIME_TYPES[file.mimetype];
        // callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage });