'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('CompraItems', {
      fields: ['produtoId'],
      type: 'foreign key',
      name: 'produtoFk',
      references: {
      table: 'Produtos',
      field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
      })
    await queryInterface.addConstraint('CompraItems', {
      fields: ['compraId'],
      type: 'foreign key',
      name: 'compraFk',
      references: {
      table: 'Compras',
      field: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'restrict'
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Compras', 'produtoFk')
    await queryInterface.removeConstraint('Compras', 'compraFk')
  }
};
