const express = require('express');
const router  = express.Router();
const User  = require('../models/users');
const Dog = require('../models/dogs');
const Cat = require('../models/cats')

//INDEX
router.get('/', async (req, res) => {
  try {
    const foundUser = await User.find({})
    res.render('users/index.ejs', {users: foundUser})
  } catch (err) {
    console.log(err)
  }
})


//NEW
router.get('/new', (req, res) => {
  res.render('users/new.ejs');
})


//SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id)
    res.render('users/show.ejs', {user: foundUser})
  } catch (err) {
    res.send(err)
  }
})


//EDIT
router.get('/:id/edit', async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id)
    res.render('users/edit.ejs', {user: foundUser})
  } catch (err) {
    res.send(err)
  }
})


//UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.redirect('/users')
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
