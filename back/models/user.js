module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        enabled: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        imageUrl: {
            type: Sequelize.STRING,
        },
        admin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    })
    return User;
};