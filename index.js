const express = require('express');
const bcrypt = require('bcrypt');
const { connect } = require('http2');
const path = require('path')
const pgp = require('pg-promise')();
const db = pgp({
  connectionString: process.env.DATABASE_URL,
  ssl: {rejectUnauthorized: false}
});
const PORT = process.env.PORT || 5000
const saltRounds = 10;

// DATABASE CONFIG
db.query("CREATE TABLE IF NOT EXISTS users ( \
  Username varchar(50), \
  Password varchar(60));"
);

// DEVELOPERS SHOULD ADD CODE HERE



// DEVELOPERS CODE ENDS HERE

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // ROUTING STARTS HERE
  .get('/', (req, res) => res.render('pages/index', { title: 'Home' }))
  .get('/help', (req, res) => res.render('pages/help', { title: 'Help' }))
  // ROUTING ENDS HERE
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

// AUTH FUNCTIONS
function registerUser(username, password) {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.none("SELECT * FROM users WHERE Username=$1;", [username])
      .then(() => { db.query("INSERT INTO users VALUES ($1, $2);", [username, hash]); });
  })
}

var fakeHash;
bcrypt.hash('2', saltRounds, (err, hash) => {fakeHash = hash});
function loginUser(username, password) {
  db.oneOrNone('SELECT * FROM users WHERE Username=$1;', [username])
    .then((user) => {
      if (user) { bcrypt.compare(password, user.Password, (err, loggedIn) => {
        if (loggedIn) { return user; }
      }) }
      else { bcrypt.compare('1', fakeAuth) }
    })
}