const express = require('express')
const router = express.Router()
const Dog = require('../models/dogs')
const User = require('../models/users')

// INDEX
router.get('/', async (req, res) => {
  try {
    const foundDogs = await Dog.find({})
    res.render('dogs/index.ejs', {dogs: foundDogs})
  } catch (err) {
    console.log(err)
  }
})

// NEW
router.get('/new', (req, res) => {
  res.render('dogs/new.ejs')
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

// SHOW
router.get('/:id', async (req, res) => {
  try {
    const foundDog = await Dog.findById(req.params.id)
    res.render('dogs/show.ejs', {dog: foundDog})
  } catch (err) {
    res.send(err)
  }
})

// EDIT
router.get('/:id/edit', async (req, res) => {
  try {
    const foundDog = await Dog.findById(req.params.id)
    res.render('dogs/edit.ejs', {dog: foundDog})
  } catch (err) {
    res.send (err)
  }
})

// UPDATE
router.put('/:id', async (req, res) => {
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
    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.redirect('/dogs')
  } catch (err) {
    res.send (err)
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedDog = await Dog.findByIdAndRemove(req.params.id)
    res.redirect('/dogs')
  } catch (err) {
    res.send (err)
  }
})



module.exports = router;
