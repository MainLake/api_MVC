const { DataTypes } = require('sequelize');
const database = require('../config/sequelize.config');

const Alumno = require('./alumno.model');
const Maestro = require('./maestro.model');
const Materia = require('./materia.model');

const Detalle = database.define('detalle', {

    idcns: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idalum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {

        },
        
    },
    idmat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idmaes: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    tableName: 'mat_alum_prof'
})

Detalle.belongsTo(Alumno, {
    foreignKey: 'idalum'
});
Detalle.belongsTo(Maestro, {
    foreignKey: 'idmaes'
});
Detalle.belongsTo(Materia, {
    foreignKey: 'idmat'
});

Alumno.hasMany(Detalle, {
    foreignKey: 'idalum'
});
Maestro.hasMany(Detalle, {
    foreignKey: 'idmaes'
});
Materia.hasMany(Detalle, {
    foreignKey: 'idmat'
});

module.exports = Detalle;