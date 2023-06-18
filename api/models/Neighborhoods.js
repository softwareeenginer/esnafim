const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Neighborhoods', {
    mahalleId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    ilceId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'districts',
        key: 'ilceId'
      }
    }
  }, {
    sequelize,
    tableName: 'neighborhoods',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mahalleId" },
        ]
      },
      {
        name: "neighborhoods_ilceId_foreign_idx",
        using: "BTREE",
        fields: [
          { name: "ilceId" },
        ]
      },
      {
        name: "ilceId",
        using: "BTREE",
        fields: [
          { name: "ilceId" },
        ]
      },
    ]
  });
};
