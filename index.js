const express = require('express');
const app = express()
const auth = express.Router()
const bcrypt = require('bcrypt');
const { connect } = require('http2');
const path = require('path');
const { errors, queryResult } = require('pg-promise');
const { isNull } = require('util');
const e = require('express');
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
app.use(express.static(path.join(__dirname, 'public')))
  .use(express.urlencoded())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index', { title: 'Home' }))
  .get('/help', (req, res) => res.render('pages/help', { title: 'Help' }))
  // ROUTING STARTS HERE



  // ROUTING ENDS HERE
  .use('/auth', auth)
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

// AUTH FUNCTIONS
// Authentication Router
// Handles HTTP requests that go to https://webapp/auth

// Login User function
// Return Values:
//    null: if matching user does not exist
//    object: returns the correct user
async function loginUser(username, password) {
  return db.one(`SELECT * FROM users WHERE Username='${username}';`, (user) => {
    return bcrypt.compare(password, user.Password).then((match) => {
      if (match) {
        return user
      } else {
        return null
      }
    })
  })
}

// Login page methods
auth.get('/login', (req, res) => res.render('pages/auth/login', { title: 'Login' }))
auth.post('/login', (req, res) => {
  bcrypt.hash('2', saltRounds, (err, fakeHash) => {
    loginUser(req.body.username, req.body.password).then((user) => {
      if (user) {
        res.send(`Successfully logged in as ${user.Username}`)
      } else {
        res.send("The username and password provided do not match our records.")
      }
    }, () => {
      bcrypt.compare('1', fakeHash)
      res.send("The username and password provided do not match our records.")
    }).catch((err) => {})
  })
})

// Register User function
// Return Values: 
//   Void
// Possible Error Values:
//    QueryResultError: This happens if the username is already taken
async function registerUser(username, password) {
  db.none(`SELECT * FROM users WHERE Username='${username}';`).then(() => {
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      db.query(`INSERT INTO users VALUES ('${username}', '${hashedPassword}');`)
    })
  })
}

// Register page methods
auth.get('/register', (req, res) => res.render('pages/auth/register', { title: 'Register' }))
auth.post('/register', (req, res) => {
  registerUser(req.body.username, req.body.password).then(() => {
    res.send(`User ${req.body.username} has been created!`)
  }, () => {
    res.send(`User ${req.body.username} already exists.`)
  })
});
