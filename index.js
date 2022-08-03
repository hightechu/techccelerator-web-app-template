const express = require('express');
const bcrypt = require('bcrypt');
const { connect } = require('http2');
const path = require('path');
const { errors } = require('pg-promise');
const pgp = require('pg-promise')();
const db = pgp({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const PORT = process.env.PORT || 5000
const saltRounds = 10;

// DATABASE CONFIG
db.query("CREATE TABLE IF NOT EXISTS users ( \
  Username varchar(50) NOT NULL UNIQUE, \
  Password varchar(60) NOT NULL);"
);

// DEVELOPERS SHOULD ADD CODE HERE



// DEVELOPERS CODE ENDS HERE

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // ROUTING STARTS HERE
  .get('/', (req, res) => res.render('pages/index', { title: 'Home' }))
  .get('/help', (req, res) => res.render('pages/help', { title: 'Help' }))
// ROUTING ENDS HERE

// AUTH FUNCTIONS

// Authentication Router
// Handles HTTP requests that go to https://webapp/auth
var fakeHash = bcrypt.hash('2', saltRounds, (err, hash) => { return hash });
var auth = express.Router()

auth.use(function (req, res, next) {
  next()
})

auth.get('/login', (req, res) => res.render('pages/auth/login', { title: 'Login' }))
auth.post('/login', (req, res) => {
  if (loginUser(req.body.username, req.body.password) !== null) {
    res.send("You are logged in as " + req.body.username)
  }
})
auth.get('/register', (req, res) => res.render('pages/auth/register', { title: 'Register' }))
auth.post('/register', (req, res) => {
  try {
    registerUser(req.body.username, req.body.password)
  } catch (err) {
    if (err.name == "QueryResultError") {
      res.send('That username is already taken.')
      return
    } else throw err
  }
  res.send("User \"" + req.body.username + "\" has been created!")
});

// Register User function
// Return Values: 
//   Void
// Possible Error Values:
//    QueryResultError: This happens if the username is already taken
function registerUser(username, password) {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.none("SELECT * FROM users WHERE Username='$1';", [username])
      .then(db.query("INSERT INTO users VALUES ($1, $2);", [username, hash]));
  })
}

// Login User function
// Return Values:
//    null: if matching user does not exist
//    object: returns the correct user
function loginUser(username, password) {
  db.oneOrNone("SELECT * FROM users WHERE Username='$1';", [username])
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.Password, (err, loggedIn) => {
          if (loggedIn) { return user; }
        })
      }
      else {
        bcrypt.compare('1', fakeHash)
        return null;
      }
    })
}

app.use('/auth', auth)
app.listen(PORT, () => console.log(`Listening on ${PORT}`))