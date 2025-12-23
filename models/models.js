const {Sequelize} = require("sequelize");

// db config
const dbConfig = require("../config/db.config")

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
    }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
