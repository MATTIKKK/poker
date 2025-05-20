module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'balance', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1500,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'balance');
  },
};