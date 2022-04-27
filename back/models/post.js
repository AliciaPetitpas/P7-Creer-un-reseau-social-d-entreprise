module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('posts', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        // imageUrl: {
        //     type: DataTypes.STRING
        // },
        // publicationDate: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW
        // },
        // likes: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // },
        // dislikes: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0
        // }
    }, );

    return Post;
};