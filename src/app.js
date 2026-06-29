const express = require('express');

//middlewares
const app = express();

app.use(express.json());


module.exports = app;