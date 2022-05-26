const express = require('express');
const router = express.Router();
const db = require('../models');

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

// Routes commentaires
router.post('/createComment', auth, commentCtrl.createComment);
router.get('/getComments/:postId', auth, commentCtrl.getComments);
router.put('/updateComment/:id', auth, commentCtrl.updateComment);
router.delete('/deleteComment/:id', auth, commentCtrl.deleteComment);

module.exports = router;