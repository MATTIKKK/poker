// migrations/YYYYMMDDHHMMSS-add-role-columns-to-participants.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Participants', 'isDealer', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('Participants', 'isSmallBlind', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('Participants', 'isBigBlind', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.addColumn('Participants', 'stack', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1000, // или начальные фишки
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Participants', 'isDealer');
    await queryInterface.removeColumn('Participants', 'isSmallBlind');
    await queryInterface.removeColumn('Participants', 'isBigBlind');
    await queryInterface.removeColumn('Participants', 'stack');
  }
};
