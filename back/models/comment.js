module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('comments', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, );

    return Comment;
};