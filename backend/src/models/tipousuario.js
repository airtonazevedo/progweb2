'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TipoUsuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TipoUsuario.init({
    rotulo: DataTypes.STRING(45)
  }, {
    sequelize,
    modelName: 'TipoUsuario',
  });
  return TipoUsuario;
};