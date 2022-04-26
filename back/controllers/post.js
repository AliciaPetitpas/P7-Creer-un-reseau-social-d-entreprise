const db = require("../models");
// const { Op } = require('sequelize');
const fs = require('fs');

// Fonction création publication
exports.createPost = (req, res) => {
    let postImg;
    // Si l'utilisateur publie une image
    if (req.file) {
        postImg = `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`
    };
    // Création de l'objet publication
    const newPost = {
        userId: req.body.userId,
        content: req.body.content,
        imageUrl: postImg
    };
    // Création de la publication
    db.Post.create(newPost)
        .then(post => res.status(201).json(post))
        .catch(error => res.status(500).json({ error }));
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


// Fonction récupération de toutes les publications
// exports.getAllPosts = (req, res) => {
//     // On recherche toutes les publications
//     db.Post.scope('formated_date').findAll({
//             // On y inclue les utilisateurs, likes et commentaires
//             include: [
//                 { model: User, as: 'User', attributes: ['firstname', 'lastname', 'imageUrl'] },
//                 { model: Like },
//                 { model: Comment, include: [
//                     { model: User, attributes: ['firstname', 'lastname', 'imageUrl'] }
//                 ]}
//             ],

//             // Les résulats sont classés par ordre décroissant des dates
//             order: [
//                 ['postDate', 'DESC'],
//                 [Comment, 'createdAt', 'DESC']
//             ]
//         })
//         .then(post => res.status(200).json(post))
//         .catch(error => res.status(500).json({ error }));
// };

// Fonction like/dislike