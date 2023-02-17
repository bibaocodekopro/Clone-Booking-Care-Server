'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[{
      email: 'admin@gmail.com',
      password:'123456',
      firstName:'Nguyen',
      lastName:'Bao',
      address:'Dai Hoc Sai Gon',
      phoneNumber:'0382460421',
      gender:1,
      image:'anhdaidien.png',
      roleId:'R1',
      position:'bac si chuyen khoa',
      createdAt:new Date(),
      updatedAt:new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
