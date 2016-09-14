const express = require('express');
const router = express.Router();
const knex = require('../db/knexfile');
const validations = require('./validations');

router.get('/', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'People knexing to People';
  knex('people').then((persons) => {
    renderObject.data = persons;
    res.render('../views/people/people.html', renderObject);
  }).catch(err => {return next(err);});
});

router.get('/new', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'New person';
  res.render('../views/people/newPerson.html', renderObject);
});

router.post('/', validations.verify, (req, res, next) => {
  console.log(req.body);
  let newPerson = {
    username: req.body.username,
    hobby: req.body.hobby
  };
  knex('people').insert(newPerson).then(() => {
    res.redirect('/people');
  }
  ).catch(err => {return next(err);});
});

router.delete('/delete/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  knex('people').where('id', id).returning('*').del().then((results) => {
    console.log(results.length);
    if (results.length) {
      res.status(200).json({
        status: 'success',
        message:
        `${results[0].username} is gone!`
      });
    }
    else {
      res.status(404).json({
        status: 'error',
        message: 'Did not delete'
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      status: 'error',
      message: "something bad happened"
    });
  });
});

module.exports = router;
