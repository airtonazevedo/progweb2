'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Compras', {
      fields: ['usuarioId'],
      type: 'foreign key',
      name: 'usuarioFk',
      references: {
      table: 'Usuarios',
      field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Compras', 'usuarioFk')
  }
};
