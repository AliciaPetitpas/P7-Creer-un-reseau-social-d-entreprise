const express = require('express');
const router = express.Router();
const db = require('../models');

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/createComment', auth, commentCtrl.createComment);
router.get('/getComments/:postId', auth, commentCtrl.getComments);

module.exports = router;