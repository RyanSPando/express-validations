Slides: [https://slides.com/akyunaakish/express-validations]('https://slides.com/akyunaakish/express-validations')

## Fork and clone this repo to get started, make a pull request to turn it in

## Set Up

- Read through this document to get familiar with the concepts
- cd into your cloned repo in your terminal, then Generate a new express app

```
$ express --hbs --git .
```

### Database setup
* Initialize knex within the terminal inside of the root directory of this repo

```
$ knex init
```

* Replace the code inside of your knexfile.js with the code below for simplicity

```
module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgresql://localhost/knex-people',
    pool: {
      min: 2,
      max: 10
    }
  }

};
```

* In the terminal, create a database that matches the name in your knexfile(this can be done from any directory)

```
$ createdb knex-people
```

* In the root directory of this repo, create a migrations file with knex

```
$ knex migrate:make create_people
```

* Now you should have a migrations folder, in your text editor, open up the file you generated within the migrations folder and create this table schema:

```
exports.up = function(knex, Promise) {
  return knex.schema.createTable('people', function (table) {
    table.increments();
    table.string('name');
    table.string('hobby');
    table.timestamps();
  })
};

exports.down = function(knex, Promise) {

};
```

* Then run that migrations file to add the people table to the knex-people database you created

```
$ knex migrate:latest
```

* Your knex-people database should now have a table "people" which has a name and hobby columns. You can confirm this by looking in psql

```
$ psql knex-people
  select * from people;
```

* Now when you have properly created your database and table, add the line below to the top of your routes/index.js file to be able to reference your database properly to perform CRUD operations in your routes

```
var knex = require('knex')(require('../knexfile')['development']);
```

- When your app and database is properly setup, Complete all of the stories below

## Stories

### Users can create people

```
When a user goes to the site's homepage
And clicks "Add a Person"
And fills out the form
And clicks "Create Person"
Then they should see the created person on the people index page
And a success message should appear
```
![](wireframes/person1.png)
![](wireframes/person3.png)

### Errors are displayed when a form is not filled out correctly

```
When a user fills out a form
And clicks "Submit"
When any of the form fields are blank (or invalid)
Then the 'new' template should be re-rendered and error messages should appear
```
![](wireframes/person2.png)

### Person names must be unique

```
When a user fills in the name field with a name that already exists in the database
And clicks "Submit"
Then the 'new' template should be re-rendered and error messages should appear that read "Name is already taken"
```

# Turn in

* Make a pull request with your completed code
