const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

//Création d'un compte, en hashage et salage du password
exports.signup = (req, res, next) => {
    //salage du mot de passe
    bcrypt.genSalt(parseInt(process.env.SALT))
        .then(salt => {
            bcrypt.hash(req.body.password, salt)
                .then(hash => {
                    //Création utilisateur
                    db.User.create({
                            email: req.body.email,
                            password: hash,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name
                        })
                        .then(() => res.status(201).json({ message: 'User created !' }))
                        .catch(error => res.status(400).json({ error }))
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Connexion à un compte
exports.login = (req, res, next) => {
    db.User.findOne({ where: { email: req.body.email } })
        .then(user => {
            //Si l'utilisateur n'est pas trouvé
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé' });
            }
            //Comparaison mot de passe
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //Si les mdp ne correspondent pas
                    if (!valid) {
                        return res.status(401).json({ error: 'Le mot de passe ne correspond pas' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        //Création d'un token de connexion
                        token: jwt.sign({ userId: user.id },
                            process.env.TOKEN_USER, { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};