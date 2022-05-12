module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Adresse email déjà utilisée"
            },
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
    }, {
        tableName: 'users',
    });

    User.associate = models => {
        User.hasMany(models.Post, {
            onDelete: "cascade"
        });
        User.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };

    return User;
};