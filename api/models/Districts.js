const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Districts', {
    ilceId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    sehirId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'citys',
        key: 'sehirId'
      }
    }
  }, {
    sequelize,
    tableName: 'districts',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ilceId" },
        ]
      },
      {
        name: "sehirId",
        using: "BTREE",
        fields: [
          { name: "sehirId" },
        ]
      },
    ]
  });
};
