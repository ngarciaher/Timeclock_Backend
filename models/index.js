const dbConfig = require("../config/db");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
 // operatorsAliases: false,
  dialectOptions: {
  //useUTC: false, // for reading from database
},
 timezone:"-05:00", 
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.employees = require("./employee.model")(sequelize, Sequelize);
db.timecard = require("./timecard.model")(sequelize, Sequelize);

module.exports = db;