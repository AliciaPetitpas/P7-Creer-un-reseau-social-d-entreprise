const db = require("../models");
const fs = require('fs');
const { User } = require("../models");

// Fonction création publication
exports.createComment = (req, res, next) => {
    console.log(req.body);
    const commentObject = {...req.body };

    db.Comment.create(
            commentObject
        )
        .then(() => res.status(201).json({
            message: 'Commentaire envoyé'
        }))
        .catch(error => res.status(400).json({ error }));
};

// Fonction récupération de toutes les publications
exports.getComments = (req, res, next) => {
    db.Comment.findAll({
            // On y inclue les informations de l'user
            include: {
                model: User,
                attributes: ['first_name', 'last_name', 'imageUrl'],
            },
            // Les résulats sont classés par ordre décroissant des dates
            order: [
                ['createdAt', 'DESC']
            ],
            where: { PostId: req.params.postId }
        })
        .then(comments => res.status(200).json(comments))
        .catch(error => res.status(500).json({ error }));
};

// Modification comment
exports.updateComment = (req, res) => {
    db.Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            // On met les informations à jour dans la base de données
            db.Comment.update({
                    content: req.body.comment.content,
                }, { where: { id: req.params.id } })
                .then(() => res.status(201).json({ message: 'Commentaire modifié' }))
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

// Suppression comment
exports.deleteComment = (req, res) => {
    db.Comment.findOne({ where: { id: req.params.id } })
        .then(comment => {
            // La publication est supprimée de la DB
            db.Comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(201).json({ message: "Commentaire supprimé" }))
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};