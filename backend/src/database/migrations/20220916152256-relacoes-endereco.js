'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Enderecos', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'usuarioFkEndereco',
      references: {
      table: 'Usuarios',
      field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Enderecos', 'usuarioFkEndereco')
  }
};
