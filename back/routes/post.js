const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const db = require("../models");

// const multer = require('../middleware/multer-config');
// const auth = require('../middleware/auth');
// const postCtrl = require('../controllers/post')

// Routes publications
//router.post('/post', multer, postCtrl.createPost);
//router.delete('/post/:id', postCtrl.deletePost);
//router.get('/getPost', postCtrl.getAllPosts);

router.post('/new', (req, res) => {
    db.Post.create({
        title: req.body.title,
        content: req.body.content,
        // imageUrl: req.body.imageUrl,
    }).then(newPost => res.send(newPost));
});

router.get('/find/:id', (req, res) => {
    db.Post.findAll({
        where: { UserId: req.params.id },
        include: [db.User]
    }).then(post => res.send(post));
})

module.exports = router;