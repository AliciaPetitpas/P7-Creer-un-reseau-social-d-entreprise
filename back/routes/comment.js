const express = require('expriss');
const router = express.Router();
const db = require('../models');

router.post('/new', (req, res) => {
    db.Post.create({
        content: req.body.content,
    }).then(newPost => res.send(newPost));
});

router.get('/find/:id', (req, res) => {
    db.Post.findAll({
        where: { PostId: req.params.id },
        // include: [db.User]
    }).then(post => res.send(post));
})

module.exports = router;