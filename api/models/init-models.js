var DataTypes = require("sequelize").DataTypes;
var _Adress = require("./Adress");
var _Citys = require("./Citys");
var _Districts = require("./Districts");
var _Follows = require("./Follows");
var _Markets = require("./Markets");
var _Neighborhoods = require("./Neighborhoods");
var _Products = require("./Products");
var _Users = require("./Users");

function initModels(sequelize) {
  var Adress = _Adress(sequelize, DataTypes);
  var Citys = _Citys(sequelize, DataTypes);
  var Districts = _Districts(sequelize, DataTypes);
  var Follows = _Follows(sequelize, DataTypes);
  var Markets = _Markets(sequelize, DataTypes);
  var Neighborhoods = _Neighborhoods(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Adress.belongsTo(Citys, { as: "sehir", foreignKey: "sehirId"});
  Citys.hasMany(Adress, { as: "adresses", foreignKey: "sehirId"});
  Districts.belongsTo(Citys, { as: "sehir", foreignKey: "sehirId"});
  Citys.hasMany(Districts, { as: "districts", foreignKey: "sehirId"});
  Adress.belongsTo(Districts, { as: "ilce", foreignKey: "ilceId"});
  Districts.hasMany(Adress, { as: "adresses", foreignKey: "ilceId"});
  Neighborhoods.belongsTo(Districts, { as: "ilce", foreignKey: "ilceId"});
  Districts.hasMany(Neighborhoods, { as: "neighborhoods", foreignKey: "ilceId"});
  Follows.belongsTo(Markets, { as: "market", foreignKey: "marketId"});
  Markets.hasMany(Follows, { as: "follows", foreignKey: "marketId"});
  Adress.belongsTo(Neighborhoods, { as: "mahalle", foreignKey: "mahalleId"});
  Neighborhoods.hasMany(Adress, { as: "adresses", foreignKey: "mahalleId"});
  Follows.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Follows, { as: "follows", foreignKey: "userId"});

  return {
    Adress,
    Citys,
    Districts,
    Follows,
    Markets,
    Neighborhoods,
    Products,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
