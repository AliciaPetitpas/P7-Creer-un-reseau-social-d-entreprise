const dbConfig = require("../config/db.config.js");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false
});

const db = {};

// MODELS
db.User = require("../models/user")(sequelize, Sequelize.DataTypes);
db.Post = require("../models/post")(sequelize, Sequelize.DataTypes);
db.Comment = require("../models/comment")(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db