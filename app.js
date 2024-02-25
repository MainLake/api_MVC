const express = require("express");
const sequelize = require('./config/sequelize.config');
const initMainRoute = require('./routes/index.route');

require('dotenv').config();

const APP = express();
const PORT = 8080;

APP.use(express.json());

initMainRoute(APP);

sequelize.sync({ force: false })
.then(() => {
    APP.listen(PORT, () => {
        console.log(`Servidor iniciado el servidor: 'http://localhost:${PORT}'`);
    });
})
.catch(error => {
    console.log("A ocurrido un error al intentar la conexion con la base de datos, ERROR: ", error);
})

