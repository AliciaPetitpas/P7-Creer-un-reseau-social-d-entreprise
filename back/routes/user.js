const express = require('express');
const router = express.Router();
const db = require("../models");

const multer = require('../middleware/multer-config');
const limitMax = require('../middleware/limit');
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', limitMax.limiter, userCtrl.login);
router.get('/getUserInfo/:id', auth, userCtrl.getUserInfo);
router.put('/updateImage/:id', auth, multer.single('image_profil'), userCtrl.updateImage);
router.put('/deactivateAccount/:id', auth, userCtrl.desactivateAccount);
router.put('/updateUser/:id', auth, userCtrl.updateUser);
router.put('/goAdmin/:id', auth, userCtrl.goAdmin);

// router.post("/new", (req, res) => {
//     db.User.create({
//         first_name: req.body.first_name,
//         last_name: req.body.last_name
//     }).then(newUser => res.send(newUser));
// });

// router.get("/all", (req, res) => {
//     db.User.findAll({
//         include: [db.Post, db.Comment]
//     }).then(allUsers => res.send(allUsers));
// });

module.exports = router;