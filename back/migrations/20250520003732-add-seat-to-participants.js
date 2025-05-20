// migrations/YYYYMMDDHHMMSS-add-seat-to-participants.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Participants', 'seat', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Participants', 'seat');
  }
};
