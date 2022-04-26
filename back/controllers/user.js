const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
// const limitMax = require('../middleware/limit');
const fs = require('fs');

// Création d'un compte, en hashage et salage du password
exports.signup = (req, res, next) => {
    // salage du mot de passe
    bcrypt.genSalt(parseInt(process.env.SALT))
        .then(salt => {
            bcrypt.hash(req.body.password, salt)
                .then(hash => {
                    // Création utilisateur
                    db.User.create({
                            email: req.body.email,
                            password: hash,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name
                        })
                        .then(() => res.status(201).json({ message: 'User created !' }))

                    // Erreur à catch sequelize (email unique)
                    //return res.status(400).json({ error: "Email déjà utilisée !" })
                    .catch(error => res.status(400).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Connexion à un compte
exports.login = (req, res, next) => {
    db.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            // Si l'utilisateur n'est pas trouvé
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            // Message erreur limiter 
            // Si l'utilisateur a désactivé son compte
            if (user.enabled == 0) {
                console.log(user.enabled)
                return res.status(400).json({ error: 'Compte désactivé' });
            }
            // Comparaison mot de passe
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    // Si les mdp ne correspondent pas
                    if (!valid) {
                        return res.status(401).json({ error: 'Le mot de passe ne correspond pas' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        // Création d'un token de connexion
                        token: jwt.sign({ userId: user.id },
                            process.env.TOKEN_USER, { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupérer information utilisateur
exports.getUserInfo = (req, res, next) => {
    db.User.findOne({ where: { id: req.params.id } })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json({ error }));
};

// Mdification image utilisateur
exports.updateImage = (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
        .then(user => {
            // Si l'image de profil est modifiée
            if (req.file) {
                if (user.imageUrl != "" && user.imageUrl != null) {
                    const filename = user.imageUrl.split('/images/profils/')[1];
                    if (filename != "") {
                        fs.unlink(`images/profils/${filename}`, (err) => {
                            if (err) throw err;
                        });
                    }
                }
                let imageUrl = `${req.protocol}://${req.get('host')}/images/profils/${req.file.filename}`;
                console.log(imageUrl);

                // On ajoute la nouvelle image et on met à jour la DB
                db.User.update({ imageUrl: imageUrl }, { where: { id: req.params.id } })
                    .then(() => res.status(201).json({ message: 'Image modifiée' }))
                    .catch(error => res.status(500).json({ error }));
            };
        })
        .catch(error => res.status(500).json({ error }));
}

// Désactivation de compte
exports.desactivateAccount = (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
        .then(user => {
            // Rend la valeur 0 à enabled
            db.User.update({ enabled: 0 }, { where: { id: req.params.id } })
                .then(() => res.status(201).json({ message: 'Compte désactivé' }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

// Update les information de l'utilisateur 
exports.updateUser = (req, res) => {
    db.User.findOne({ where: { id: req.params.id } })
        .then(user => {
            bcrypt.genSalt(parseInt(process.env.SALT))
                .then(salt => {
                    bcrypt.hash(req.body.user.password, salt)
                        .then(hash => {
                            // On met le mdp à jour dans la base de données
                            db.User.update({
                                    password: hash,
                                    // Informations supplémentaires si besoin
                                }, { where: { id: req.params.id } })
                                .then(() => res.status(201).json({ message: 'Informations modifiées' }))
                                .catch(error => res.status(500).json({ error }));
                        })
                        .catch(error => res.status(500).json({ error }));
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};