const express = require('express');
const bodyParser = require('body-parser');
const clienteRoutes = require('./src/routes/clienteRoutes');
const itemRoutes = require('./src/routes/itemRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use('/clientes', clienteRoutes);
app.use('/items', itemRoutes);
app.use('/pedidos', pedidoRoutes);

module.exports = app;
