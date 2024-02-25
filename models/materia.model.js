const { DataTypes } = require('sequelize');
const database = require('../config/sequelize.config');

const Materia = database.define('materia', {
    idmat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grado: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'materia'
});

module.exports = Materia;