const express = require('express')
const router = express.Router()
const Dog = require('../models/dogs')
const User = require('../models/users')

// INDEX
router.get('/', async (req, res) => {
  try {
    const foundDogs = await Dog.find({})
    res.render('dogs/index.ejs')
  } catch (err) {
    console.log(err)
  }
})

// NEW
router.get('/new', async (req, res) => {
  try {
    const allDogs = await Dog.find({})
    res.render('dogs/new.ejs', {dogs: allDogs})
  } catch (err) {
    res.send(err)
  }
}) 

// SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundDog = await Dog.findById(req.params.id)
    const foundUser = await User.findOne({"dogs._id": req.params.id})
    res.render('dogs/show.ejs', {dog: foundDog, user:foundUser})
  } catch (err) {
    res.send(err)
  }
})

// CREATE
router.post('/', async (req, res) => {
  if(req.body.goodWithKids === 'on') {
    req.body.goodWithKids = true
  } else {
    req.body.goodWithKids = false
  }
  if(req.body.goodWithPets === 'on') {
    req.body.goodWithPets = true
  } else {
    req.body.goodWithPets = false
  }
  if(req.body.highEnergy === 'on') {
    req.body.highEnergy = true
  } else {
    req.body.highEnergy = false
  }
  try {
    const createdDog = await Dog.create(req.body)
    res.redirect('/dogs')
  } catch (err) {
    res.send(err)
  }
})





module.exports = router;