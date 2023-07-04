const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notifications', {
    bildirimId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    marketId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'markets',
        key: 'marketId'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    product: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    priceProduct: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    priceDiscount: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notifications',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bildirimId" },
        ]
      },
      {
        name: "marketId",
        using: "BTREE",
        fields: [
          { name: "marketId" },
        ]
      },
      {
        name: "userId",
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
    ]
  });
};
