const bcrypt = require('bcryptjs');
module.exports = {
  async up (queryInterface, Sequelize) {
    const hash = await bcrypt.hash('admin', 10)
    await queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'admin',
        email: 'admin@admin.com',
        senha: hash,
        createdAt: new Date(),
        updatedAt: new Date(),
        tipoUsuarioId: 2,
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('TipoUsuarios', {}, {});
     
  }
};
