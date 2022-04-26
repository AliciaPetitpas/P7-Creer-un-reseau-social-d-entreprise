const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
const limitMax = require('../middleware/limit');
const userCtrl = require('../controllers/user');
// const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', limitMax.limiter, userCtrl.login);
router.get('/getUserInfo/:id', userCtrl.getUserInfo);
// router.post('/images', multer, userCtrl.updateImage);
router.put('/updateImage/:id', multer.single('image_profil'), userCtrl.updateImage);

module.exports = router;