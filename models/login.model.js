const { DataTypes } = require('sequelize');
const database = require('../config/sequelize.config');

const Login = database.define('login', {
    idlog: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwrd: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'login'
}); 

module.exports = Login;