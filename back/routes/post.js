const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer-config');
// const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post')

// Routes publications
//router.post('/post', multer, postCtrl.createPost);
//router.delete('/post/:id', postCtrl.deletePost);
//router.get('/getPost', postCtrl.getAllPosts);

module.exports = router;