var express = require('express');
var router = express.Router();
//Including dependency
var Sequelize = require("sequelize");

//Setting up the config
var sequelize = new Sequelize('personal_information', 'root', 'supermanvsthor', {
  host: "127.0.0.1",
  port: 3306,
  dialect: 'mysql'
});

//Checking connection status
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = router;