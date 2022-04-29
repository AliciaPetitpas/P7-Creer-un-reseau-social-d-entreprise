module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comments', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, );

    Comment.associate = models => {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Comment;
};