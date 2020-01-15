const express = require('express');
const routes = require('./routes');
// const axios = require('axios'); library for API

// Controller methods:
// Index: Mostra uma lista
// Show: mostrar um unico item
// Update: update
// Destroy: deletar

const app = express();

app.use(express.json());
app.use(routes);


app.listen(8080);


