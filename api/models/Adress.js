const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Adress', {
    adressId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
        name: "mahalleId",
        using: "BTREE",
        fields: [
          { name: "mahalleId" },
        ]
      },
    ]
  });
};
