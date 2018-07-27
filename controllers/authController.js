const express = require('express')
const router = express.Router()
const User = require('../models/users')
const Dog = require('../models/dogs');
const Cat = require('../models/cats')
const bcrypt = require('bcrypt')


//
router.get('/login', (req, res) => {
  res.render('auth/login.ejs', {
    message: req.session.message,
    userId: req.session.id
    
  })
})

//
router.get('/dogs', (req, res) => {
  if(req.session.loggedIn === true){
    Dogs.find({}, (err, foundDogs)=>{
      res.render('dogs/index.ejs', {
        dogs: foundDogs,
        username: req.session.username,
        userId: req.session.id
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
        username: req.session.username,
        userId: req.session.id
      });
    });
  } else {
    req.session.message = 'login required'
    res.redirect('/auth/login');
  }
})

// REGISTER
router.post('/register', (req, res) => {
  const password = req.body.password
  const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const userDbEntry = {}
  userDbEntry.username = req.body.username
  userDbEntry.password = passwordHash
  User.create(userDbEntry, (err, user) => {
    // userDbEntry.username = req.session.username, 
    // userDbEntry.firstName = req.session.firstName,
    // userDbEntry.lastName = req.session.lastName,
    // userDbEntry.email = req.session.email,
    // userDbEntry.phone = req.session.phone,
    // userDbEntry.age = req.session.age, 
    // userDbEntry.maritalStatus = req.session.maritalStatus,
    // userDbEntry.children = req.session.children,
    // userDbEntry.childrenAges = req.session.childrenAges,
    // userDbEntry.yard = req.session.yard,
    // userDbEntry.otherPets = req.session.otherPets,
    req.session.loggedIn = true;
    req.session.userId = user.id;
    res.redirect('/users/new')
  })
})

// LOG IN
router.post('/login', (req, res) => {
  User.findOne({username: req.body.username}, (err, user) => {
    if (user) { 
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log(req.session) 
        req.session.loggedIn = true;
        req.session.username = req.body.username
        req.session.userId = user.id
        res.redirect('/')
      } else {
        req.session.message = "Username or Password Incorrect"
        res.redirect('/auth/login')
      }
    } else {
      req.session.message = "Username or Password Incorrect"
      res.redirect('/auth/login')
    }
  })
})

// LOG OUT
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.send('error destroying session')
    } else {
      res.redirect('/')
    }
  })
})

module.exports = router