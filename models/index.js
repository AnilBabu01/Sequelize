const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.max,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./products.js")(sequelize, DataTypes);
db.reviews = require("./reviews.js")(sequelize, DataTypes);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Re-sync successfully!");
  })
  .catch((error) => {
    console.error("Unable to Re-sync : ", error);
  });

module.exports = db;
