const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getUserInfo/:id', userCtrl.getUserInfo);
// router.post('/images', multer, userCtrl.updateImage);
router.put('/updateImage/:id', multer.single('image_profil'), userCtrl.updateImage);

module.exports = router;