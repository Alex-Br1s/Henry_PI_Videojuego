const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genres', {
    id:{
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
})
};