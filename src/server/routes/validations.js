const knex = require('../db/knexfile');

function verify(req, res, next) {
  //errors array
  const errors = [];
  const username = req.body.username;
  const hobby = req.body.hobby;
  if (username.length < 1) {
    errors.push('username cannot be blank');
  }
  if (hobby.length < 1) {
    errors.push('hobby cannot be blank');
  }
  //check to see if in database
  isUnique('username', username, (err, resolve) => {
    if (err) {
      return next(err);
    }
    if (resolve) {
      errors.push('Sorry, that username is already in use.');
      if (errors.length > 0) {
        const renderObject = {};
        renderObject.errors = errors;
        res.render('../views/people/newPerson.html', renderObject);
      }
      else {
        return next();
      }
    }
    else {
      return next();
    }
  });
}
module.exports = {
  verify
};

function isUnique(column, value, callback) {
  knex('people')
    .where(column, value)
    .then(person => {
    if (person.length > 0) {
      return callback(null, true);
    }
    else {
      return callback(null, false);
    }
  }).catch(err => callback(err));
}
