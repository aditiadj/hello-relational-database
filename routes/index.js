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

// GET all data from table
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => {
      res.send(JSON.parse(JSON.stringify(users)))
    })
});

// GET one data by id from table
router.get('/:id', (req, res, next) => {
  User.findById(
      req.params.id
    )
    .then(users => {
      res.send(JSON.parse(JSON.stringify(users)))
    })
});

// POST data into table
router.post('/', (req, res, next) => {
  User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdate: req.body.birthdate
    })
    .then(() => {
      res.send({
        message: 'Data created successfully.'
      });
    })
    .catch(err => {
      res.send({
        message: 'Unable create data',
        err
      });
    });
});

// UPDATE data
router.put('/:id', (req, res, next) => {
  User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdate: req.body.birthdate
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.send({
        message: 'Update data successfully.'
      });
    })
    .catch(err => {
      res.send({
        message: 'Unable update data',
        err
      });
    });
});

// DELETE data
router.delete('/:id', (req, res, next) => {
  User.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => {
      res.send({
        message: 'Delete data successfully.'
      });
    })
    .catch(err => {
      res.send({
        message: 'Unable create data',
        err
      });
    });
});

module.exports = router;