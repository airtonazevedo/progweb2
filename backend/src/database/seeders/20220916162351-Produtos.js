module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Produtos', Array.from(Array(50).keys()).map(i => ({
      nome: 'pro ' + i,
      estoque: i,
      preco: i/2,
      createdAt: new Date(),
      updatedAt: new Date(),
    })), {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('TipoUsuarios', {}, {});
     
  }
};
