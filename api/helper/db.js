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

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;