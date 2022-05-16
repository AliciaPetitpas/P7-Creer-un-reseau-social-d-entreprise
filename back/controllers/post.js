const db = require("../models");
// const { Op } = require('sequelize');
const fs = require('fs');
const { User } = require("../models");

// Fonction création publication
exports.createPost = (req, res, next) => {
    const postObject = req.file ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`,
    } : {...JSON.parse(req.body.post) };

    db.Post.create(
            postObject
        )
        .then(() => res.status(201).json({
            message: 'Publication enregistrée'
        }))
        .catch(error => res.status(400).json({ error }));
};

// Fonction récupération de toutes les publications
exports.getPosts = (req, res, next) => {
    db.Post.findAll({
            // On y inclue les informations de l'user
            include: {
                model: User,
                attributes: ['first_name', 'last_name', 'imageUrl'],
            },
            // Les résulats sont classés par ordre décroissant des dates
            order: [
                ['createdAt', 'DESC']
            ],
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json({ error }));
};

// Fonction récupération d'une publication'
exports.getPost = (req, res, next) => {
    db.Post.findOne({
            // On y inclue les informations de l'user
            include: {
                model: User,
                attributes: ['first_name', 'last_name', 'imageUrl'],
            },
            where: { id: req.params.id }
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(500).json({ error }));
};

// Update les information d'une publication 
exports.updatePost = (req, res) => {
    db.Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            // On met les informations à jour dans la base de données
            db.Post.update({
                    title: req.body.post.title,
                    content: req.body.post.content,
                }, { where: { id: req.params.id } })
                .then(() => res.status(201).json({ message: 'Informations modifiées' }))
                .catch(error => {
                    let message = error.errors[0].message;
                    return res.status(500).json({ error: message });
                })
        })
        .catch(error => res.status(500).json({ error }));
    // .catch(error => {
    //     let message = error.errors[0].message;
    //     return res.status(500).json({ error: message });
    // })
};


// Fonction suppression publication
exports.deletePost = (req, res) => {
    db.Post.findOne({ where: { id: req.params.id } })
        .then(post => {
            // Si la publication comprend une image, elle est supprimée du serveur
            if (post.imageUrl != null) {
                const filename = post.imageUrl.split('/images/posts/')[1];
                fs.unlink(`images/posts/${filename}`, (err) => {
                    if (err) throw err;
                })
            };
            // La publication est supprimée de la DB
            db.Post.destroy({ where: { id: req.params.id } })
                .then(() => res.status(201).json({ message: "Publication supprimée" }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Fonction like/dislike