const express = require("express")
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//rotas
const routes = require('../src/routes');

// Conexão com banco de dados
mongoose.connect("mongodb+srv://jandosoGeneral:12345@omnistack-34kgb.mongodb.net/testeConcrete?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.log.bind(console, 'Connection error: '));
db.once("open", () => {
    console.log('Successfully connected to DB');
});

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use("/api", routes);

module.exports = app
