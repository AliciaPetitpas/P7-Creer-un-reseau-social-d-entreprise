//Imp. Jsonwebtoken
const jwt = require('jsonwebtoken');
const db = require('../models');
require('dotenv').config();

// Vérification de la connexion de l'utilisateur grâce à un token
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, process.env.TOKEN_USER);
        const userId = decodedToken.userId;

        db.User.findOne({ where: { id: userId } })
            .then(user => {
                if (!user) {
                    throw 'Utilisateur ID non valable !';
                } else {
                    next();
                }
            })

    } catch (error) {
        res.status(401).json({
            error: new Error('Requête invalide')
        });
    }
};