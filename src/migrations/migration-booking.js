'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bookings', {
        // statusId: DataTypes.STRING,
        // doctocId: DataTypes.STRING,
        // patientId: DataTypes.STRING,
        // date: DataTypes.DATE,
        // timeType: DataTypes.STRING
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
       statusId: {
        type: Sequelize.STRING
      },
      doctorID: {
        type: Sequelize.STRING
      },
      patientId: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
        timeType: {
        type: Sequelize.STRING
        },
         createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bookings');
  }
};