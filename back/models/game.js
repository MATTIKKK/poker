'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.belongsTo(models.User, { foreignKey: 'hostId', as: 'host' });
      
      Game.belongsToMany(models.User, {
        through: models.Participant,
        as: 'players',
        foreignKey: 'gameId',
        otherKey: 'userId',
      });
    }
  }
  Game.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'waiting',
      },
    },
    {
      sequelize,
      modelName: 'Game',
      tableName: 'Games',
      timestamps: true,
    }
  );
  return Game;
};
