const SequelizeAuto = require("sequelize-auto");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "esnafim", // database_name
  "root", // username
  "", //password
  {
    host: "localhost", // web-server
    dialect: "mysql", //DATABASE DIALECT
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
      timestamps: true,
    },
  }
);
auto.run();

const initModels = require("../models/init-models");

const db = { ...initModels(sequelize) };

db.Users = require(__dirname + "/../models/Users")(sequelize, Sequelize);
db.Markets = require(__dirname + "/../models/Markets")(sequelize, Sequelize);
db.Follows = require(__dirname + "/../models/Follows")(sequelize, Sequelize);
db.Products = require(__dirname + "/../models/Products")(sequelize, Sequelize);
db.Citys = require(__dirname + "/../models/Citys")(sequelize, Sequelize);
db.Districts = require(__dirname + "/../models/District")(sequelize, Sequelize);
db.Neighborhoods = require(__dirname + "/../models/Neighborhoods")(
  sequelize,
  Sequelize
);
db.Adress = require(__dirname + "/../models/Adress")(sequelize, Sequelize);
db.Notifications = require(__dirname + "/../models/Notifications")(sequelize, Sequelize);

db.Users.hasMany(db.Follows, {
  foreignKey: "userId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Follows.belongsTo(db.Users, {
  foreignKey: "userId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Users.hasMany(db.Markets, {
  foreignKey: "userId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Markets.belongsTo(db.Users, {
  foreignKey: "userId",
  onDelete: "cascade",
  onUpdate: "cascade",
});

db.Markets.hasMany(db.Products, {
  foreignKey: "marketId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Products.belongsTo(db.Markets, {
  foreignKey: "marketId",
  onDelete: "cascade",
  onUpdate: "cascade",
});


db.Markets.hasMany(db.Follows, {
  foreignKey: "marketId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Follows.belongsTo(db.Markets, {
  foreignKey: "marketId",
  onDelete: "cascade",
  onUpdate: "cascade",
});

db.Citys.hasMany(db.Districts, {
  foreignKey: "sehirId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Districts.belongsTo(db.Citys, {
  foreignKey: "sehirId",
  onDelete: "cascade",
  onUpdate: "cascade",
});



/*
db.Districts.hasMany(db.Neighborhoods, {
  foreignKey: "ilceId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Neighborhoods.belongsTo(db.Districts, {
  foreignKey: "ilceId",
  onDelete: "cascade",
  onUpdate: "cascade",
});

*/
/*db.Adress.hasMany(db.Citys, {
  foreignKey: "adressId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Citys.belongsTo(db.Adress, {
  foreignKey: "adressId",
  onDelete: "cascade",
  onUpdate: "cascade",
});*/

/*
db.Adress.hasMany(db.Districts, {
  foreignKey: "adressId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Districts.belongsTo(db.Adress, {
  foreignKey: "adressId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Adress.hasMany(db.Neighborhoods, {
  foreignKey: "adressId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
db.Neighborhoods.belongsTo(db.Adress, {
  foreignKey: "adressId",
  onDelete: "cascade",
  onUpdate: "cascade",
});
*/




db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
