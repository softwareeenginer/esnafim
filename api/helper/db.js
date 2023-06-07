const SequelizeAuto = require("sequelize-auto");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "esnafim", // database_name
  "root", // username
  "", //password
  {
    host: "localhost", // web-server
    dialect: "mysql",  //DATABASE DIALECT
    timezone: "+00:00",
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    logging: true,
  }
);

// ---------- AUTOMATION SAVE FROM DB TO MODELS ---------- //
const auto = new SequelizeAuto(
  "esnafim", // database_name
  "root", // username
  "", // password
  {
    host: "localhost", // web-server
    dialect: "mysql", //DATABASE DIALECT
    directory: "./models",
    caseFile: "p",
    caseModel: "p",
    caseProp: "s",
    additional: {
      timestamps: true
    },
  },
);
auto.run();

const initModels = require("../models/init-models");

const db = { ...initModels(sequelize) };

db.Users = require(__dirname + "/../models/Users")(sequelize, Sequelize);
db.Markets = require(__dirname + "/../models/Markets")(sequelize, Sequelize);
db.Follows = require(__dirname + "/../models/Follows")(sequelize, Sequelize);

db.Users.hasMany(db.Follows, { foreignKey: "userId", onDelete: "cascade", onUpdate: "cascade", });
db.Follows.belongsTo(db.Users, { foreignKey: "userId", onDelete: "cascade", onUpdate: "cascade", });

db.Markets.hasMany(db.Follows, { foreignKey: "marketId", onDelete: "cascade", onUpdate: "cascade", });
db.Follows.belongsTo(db.Markets, { foreignKey: "marketId", onDelete: "cascade", onUpdate: "cascade", });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;