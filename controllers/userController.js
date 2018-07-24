const express = require('express');
const router  = express.Router();
const User  = require('../models/users');
const Dog = require('../models/dogs');
const Cat = require('../models/cats')

//INDEX
router.get('/', async (req, res) => {
  try {
    const foundUser = await User.find({})
    console.log(foundUser, 'this is found user')
    res.render('users/index.ejs', {
      users: foundUser,
      userId: req.session.id
    })
  } catch (err) {
    console.log(err)
  }
})


//NEW
router.get('/new', (req, res) => {

  res.render('users/new.ejs', {
    userId: req.session.id
  });
})


//SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundUser = await User.findById(req.session.id)
    res.render('users/show.ejs', {
      user: foundUser,
      userId: req.session.id
    })
  } catch (err) {
    res.send(err)
  }
})


//EDIT
router.get('/:id/edit', async (req, res) => {
  try {
    const foundUser = await User.findById(req.session.id)
    res.render('users/edit.ejs', {
      user: foundUser, 
      userId: req.session.id
    })
  } catch (err) {
    res.send(err)
  }
})


//UPDATE
router.put('/:id', async (req, res) => {
  //.get the user  based on username in session
  // update that user
  // user.save()
  console.log(req.body)

  try {
    // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    const foundUser = await User.findOne({userId: req.session.id})
    User.update(userDbEntry, (err, user) => {
      req.session.firstName = user.firstName
      req.session.lastName = user.lastName
      req.session.email = user.email
      req.session.phone = user.phone
      req.session.age = user.age
      req.session.maritalStatus = user.maritalStatus
      req.session.children = user.children
      req.session.childrenAges =  user.childrenAges
      req.session.yard = user.yard
      req.session.otherPets = user.otherPets
    })
    console.log(foundUser)

    foundUser.save()
    res.redirect('/users/userId')
  } catch (err) {
    res.send(err)
  }
})


//POST
router.post('/', async (req, res) => {
  try {
    const createdUser = await User.create(req.body)
    res.redirect('/')
  } catch (err) {
    res.send(err)
  }
})

// DELETE 
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id)
    res.redirect('/users')
  } catch (err) {
    res.send(err)
  }
})



module.exports = router;
