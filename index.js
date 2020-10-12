const express = require('express');

require('dotenv').config();
const path = require('path');
// DB config

require('./database/config').dbConnection();
//APP DE EXpress

const app = express();

//lectura y paseo del body
app.use(express.json());

//Node Server

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');
//path publico

const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

//mis rutas

app.use('/api/login', require('./routes/auth'));

server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto', process.env.PORT);


});