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

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  birthdate: {
    type: Sequelize.DATE
  }
});

//create table
router.get('/tables', (req, res, next) => {
  User.sync({
      force: true
    })
    .then(() => {
      res.send({
        message: 'Table created successfully.'
      });
    })
    .catch(err => {
      res.send({
        message: 'Unable create table',
        err
      });
    });
});

module.exports = router;