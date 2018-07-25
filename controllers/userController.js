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
router.put('/:id', (req, res) => {
    // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    const foundUser = User.findById({userId: req.session.id})
    const doc = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      age: req.body.age,
      maritalStatus: req.body.maritalStatus,
      children: req.body.children,
      childrenAges: req.body.childrenAges,
      yard: req.body.yard,
      otherPets: req.body.otherPets
    }
    User.update(foundUser, doc, (err, user) => {
    console.log(foundUser)

    foundUser.save()
    res.redirect('/users/userId')
  }) 
  })


//POST
router.post('/', async (req, res) => {
  try {
    const createdUser = await User.update(req.body)
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
