const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Adress', {
    adressId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sehirId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'citys',
        key: 'sehirId'
      }
    },
    ilceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'districts',
        key: 'ilceId'
      }
    },
    mahalleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'neighborhoods',
        key: 'mahalleId'
      }
    }
  }, {
    sequelize,
    tableName: 'adress',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "adressId" },
        ]
      },
      {
        name: "sehirId",
        using: "BTREE",
        fields: [
          { name: "sehirId" },
        ]
      },
      {
        name: "ilceId",
        using: "BTREE",
        fields: [
          { name: "ilceId" },
        ]
      },
      {
        name: "mahalleId",
        using: "BTREE",
        fields: [
          { name: "mahalleId" },
        ]
      },
    ]
  });
};
