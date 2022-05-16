const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
require('dotenv').config();

//ROUTES
const usersRoutes = require('./routes/user');
const postsRoutes = require('./routes/post');
const commentsRoutes = require('./routes/comment')

app.use(helmet())

//CORS
var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', '*')
    next();
});

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Accès principaux
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', usersRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentsRoutes);

//id post
app.get('/api/posts/:id', function(req, res) {
    res.send();
})

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application!" })
});

module.exports = app;