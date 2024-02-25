const { DataTypes } = require('sequelize');
const database = require('../config/sequelize.config');

const Alumno = database.define('alumno', {
    idalum: {
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
    tableName: 'alumno'
});

module.exports = Alumno;