
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('people').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('people').insert({id: 1, username: 'Ryan', hobby: 'Dank Memes'}),
        knex('people').insert({id: 2, username: 'Amanda', hobby: 'Drinking Wine'}),
        knex('people').insert({id: 3, username: 'Robert', hobby:'Violently interacting with Lili'})
      ]);
    });
};
