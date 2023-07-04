var DataTypes = require("sequelize").DataTypes;
var _Adress = require("./Adress");
var _Citys = require("./Citys");
var _Districts = require("./Districts");
var _Follows = require("./Follows");
var _Markets = require("./Markets");
var _Neighborhoods = require("./Neighborhoods");
var _Notifications = require("./Notifications");
var _Products = require("./Products");
var _Users = require("./Users");

function initModels(sequelize) {
  var Adress = _Adress(sequelize, DataTypes);
  var Citys = _Citys(sequelize, DataTypes);
  var Districts = _Districts(sequelize, DataTypes);
  var Follows = _Follows(sequelize, DataTypes);
  var Markets = _Markets(sequelize, DataTypes);
  var Neighborhoods = _Neighborhoods(sequelize, DataTypes);
  var Notifications = _Notifications(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Users.belongsTo(Adress, { as: "adress", foreignKey: "adressId"});
  Adress.hasMany(Users, { as: "users", foreignKey: "adressId"});
  Follows.belongsTo(Markets, { as: "market", foreignKey: "marketId"});
  Markets.hasMany(Follows, { as: "follows", foreignKey: "marketId"});
  Notifications.belongsTo(Markets, { as: "market", foreignKey: "marketId"});
  Markets.hasMany(Notifications, { as: "notifications", foreignKey: "marketId"});
  Products.belongsTo(Markets, { as: "market", foreignKey: "marketId"});
  Markets.hasMany(Products, { as: "products", foreignKey: "marketId"});
  Adress.belongsTo(Neighborhoods, { as: "mahalle", foreignKey: "mahalleId"});
  Neighborhoods.hasMany(Adress, { as: "adresses", foreignKey: "mahalleId"});
  Follows.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Follows, { as: "follows", foreignKey: "userId"});
  Markets.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Markets, { as: "markets", foreignKey: "userId"});
  Notifications.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Notifications, { as: "notifications", foreignKey: "userId"});

  return {
    Adress,
    Citys,
    Districts,
    Follows,
    Markets,
    Neighborhoods,
    Notifications,
    Products,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
