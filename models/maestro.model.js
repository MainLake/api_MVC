const { DataTypes } = require('sequelize');
const database = require('../config/sequelize.config');

const Maestro = database.define('maestro', {
    idmaes: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'maestro'
});

module.exports = Maestro;