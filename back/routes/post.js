const express = require('express');
const router = express.Router();
const db = require("../models");

const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

// Routes publications
router.post('/createPost', auth, multer.single('image_post'), postCtrl.createPost);
router.get('/getPosts', auth, postCtrl.getPosts);
router.get('/getPost/:id', auth, postCtrl.getPost);
router.put('/updatePost/:id', auth, multer.single('image_post'), postCtrl.updatePost);
router.delete('/post/:id', postCtrl.deletePost);
router.put('/deletePost/:id', auth, postCtrl.deletePost);

module.exports = router;