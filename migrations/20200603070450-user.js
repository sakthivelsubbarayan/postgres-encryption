'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.TEXT,
      },
      data: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};

