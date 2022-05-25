const express = require('express');
const router = express.Router();
const db = require('../models');

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/createComment', auth, commentCtrl.createComment);
router.get('/getComments/:postId', auth, commentCtrl.getComments);
router.put('/updateComment/:id', auth, commentCtrl.updateComment);
router.delete('/comment/:id', commentCtrl.deleteComment);
router.put('/deleteComment/:id', auth, commentCtrl.deleteComment);

module.exports = router;