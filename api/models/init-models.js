var DataTypes = require("sequelize").DataTypes;
var _Follows = require("./Follows");
var _Markets = require("./Markets");
var _Users = require("./Users");

function initModels(sequelize) {
  var Follows = _Follows(sequelize, DataTypes);
  var Markets = _Markets(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  Follows.belongsTo(Markets, { as: "market", foreignKey: "marketId"});
  Markets.hasMany(Follows, { as: "follows", foreignKey: "marketId"});
  Follows.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(Follows, { as: "follows", foreignKey: "userId"});

  return {
    Follows,
    Markets,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
