const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Création d'un compte, en hashage et salage du password
exports.signup = (req, res, next) => {
    //salage du mot de passe
    bcrypt.genSalt(parseInt(process.env.SALT))
        .then(salt => {
            bcrypt.hash(req.body.password, salt)
                .then(hash => {
                    //Création utilisateur
                    const user = new User({
                        //DATABASE INFO
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'User created' }))
                        .catch(error => res.status(400).json({ message: 'User already created' }));
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//Connexion à un compte
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            //Si l'utilisateur n'est pas trouvé
            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }
            //Comparaison mot de passe
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    //Si les mdp ne correspondent pas
                    if (!valid) {
                        return res.status(401).json({ error: 'Wrong password' });
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