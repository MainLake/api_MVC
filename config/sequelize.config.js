const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'root',
    password: 'root',
    database: 'name_db',
    define: {
        timestamps: false
    }
});


module.exports = sequelize