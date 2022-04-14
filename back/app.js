const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet')
const app = express();
require('dotenv').config();

//ROUTES
const usersRoutes = require('./routes/users');
// const publicationsRoutes = require('./routes/publications');
// const commentsRoutes = require('./routes/comments')

app.use(express.json());
app.use(cors());
app.use(helmet())

//CORS headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader(
        'Cross-Origin-Resource-Policy', 'cross-origin'
    );
    next();
});

//Accès principaux
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', usersRoutes);

module.exports = app;