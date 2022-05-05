const express = require('express');
const router = express.Router();
const db = require("../models");

//const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post')

// Routes publications
router.post('/createPost', auth, postCtrl.createPost);
//router.delete('/post/:id', postCtrl.deletePost);
//router.get('/getPost', postCtrl.getAllPosts);

module.exports = router;