const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/publications')
    // const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes publications
router.post('', multer, postCtrl.createPost);
router.delete('/:id', postCtrl.deletePost);
router.get('', postCtrl.getAllPosts);

module.exports = router;