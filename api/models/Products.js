const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Products', {
    urunId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    price: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "1"
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    marketId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'markets',
        key: 'marketId'
      }
    },
    priceDiscount: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "1"
    },
    howMany: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: "1"
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "urunId" },
        ]
      },
      {
        name: "products_marketId_foreign_idx",
        using: "BTREE",
        fields: [
          { name: "marketId" },
        ]
      },
      {
        name: "marketId",
        using: "BTREE",
        fields: [
          { name: "marketId" },
        ]
      },
    ]
  });
};
