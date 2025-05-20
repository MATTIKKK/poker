'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    static associate(models) {
      // Каждая запись участника привязана к конкретному юзеру
      Participant.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      // И к конкретной игре
      Participant.belongsTo(models.Game, {
        foreignKey: 'gameId',
        as: 'game'
      });
    }
  }

  Participant.init(
    {
      gameId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      seat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      isDealer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isSmallBlind: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isBigBlind: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      stack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'Participant',
      tableName: 'Participants',
      timestamps: true
    }
  );

  return Participant;
};