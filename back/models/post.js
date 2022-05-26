module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING
        },
    }, {
        tableName: 'posts',
    });

    // Associations Post
    Post.associate = models => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Post.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };

    return Post;
};