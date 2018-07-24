const express = require('express')
const router  = express.Router()
const User    = require('../models/users')
const bcrypt  = require('bcrypt')


//
router.get('/login', (req, res) => {
  res.render('auth/login.ejs', {
    message: req.session.message
  })
})

//
router.get('/dogs', (req, res) => {
  if(req.session.loggedIn === true){
    Dogs.find({}, (err, foundDogs)=>{
      res.render('dogs/index.ejs', {
        dogs: foundDogs,
        username: req.session.username
      });
    });
  } else {
    req.session.message = 'login required'
    res.redirect('/auth/login');
  }
})

//
router.get('/cats', (req, res) => {
  if(req.session.loggedIn === true){
    Cats.find({}, (err, foundCats)=>{
      res.render('cats/index.ejs', {
        cats: foundCats,
        username: req.session.username
      });
    });
  } else {
    req.session.message = 'login required'
    res.redirect('/auth/login');
  }
})

//
router.post('/login', (req, res) => {
  const password = req.body.password
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const userDbEntry = {}
  userDbEntry.username = req.body.username
  userDbEntry.password = passwordHash
  User.create(userDbEntry, (err, user) => {
    req.session.username = user.username
    req.session.loggedIn = true
    res.redirect('/users')
  })
})

// LOG OUT
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send('error destroying session')
    } else {
      res.redirect('/index')
    }
  })
})

module.exports = router