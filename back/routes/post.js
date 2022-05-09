const express = require('express');
const router = express.Router();
const db = require("../models");

const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

// Routes publications
router.post('/createPost', auth, multer.single('image_post'), postCtrl.createPost);
router.get('/getPost', auth, postCtrl.getPost);
//router.delete('/post/:id', postCtrl.deletePost);

module.exports = router;