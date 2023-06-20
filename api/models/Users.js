const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    userId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    surname: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    adressId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'adress',
        key: 'adressId'
      }
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userId" },
        ]
      },
      {
        name: "adressId",
        using: "BTREE",
        fields: [
          { name: "adressId" },
        ]
      },
      {
        name: "users_adressId_foreign_idx",
        using: "BTREE",
        fields: [
          { name: "adressId" },
        ]
      },
    ]
  });
};
